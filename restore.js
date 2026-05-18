import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import dns from 'dns';

// Import all models
import Document from './models/document.model.js';
import Investment from './models/investment.model.js';
import ProfileUpdateRequest from './models/profileUpdateRequest.model.js';
import Schedule from './models/schedule.model.js';
import User from './models/user.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const models = {
    Document,
    Investment,
    ProfileUpdateRequest,
    Schedule,
    User
};

async function restoreBackups() {
    try {
        if (!process.env.RESTORE_MONGO_URI) {
            console.warn('\n⚠️  WARNING: RESTORE_MONGO_URI does not exist in .env file!');
            console.warn('Please add RESTORE_MONGO_URI=<your_database_url> to your .env file before running restore.\n');
            process.exit(1);
        }

        console.log('Connecting to database...');
        dns.setServers(['8.8.8.8', '1.1.1.1']);
        await mongoose.connect(process.env.RESTORE_MONGO_URI);
        console.log('Connected to database.');

        const backupDir = path.join(__dirname, 'Backup');
        if (!fs.existsSync(backupDir)) {
            console.error('Backup directory does not exist! Please run backup.js first.');
            process.exit(1);
        }

        // Loop through each model and restore data
        for (const [name, Model] of Object.entries(models)) {
            const filePath = path.join(backupDir, `${name}.json`);
            
            if (!fs.existsSync(filePath)) {
                console.log(`No backup file found for ${name} model, skipping...`);
                continue;
            }

            console.log(`Restoring data for ${name} model...`);
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const items = JSON.parse(fileData);

            let newRecords = 0;
            let updatedRecords = 0;

            for (const item of items) {
                // Check if the document already exists in the database
                let dbItem = await Model.findById(item._id);
                
                if (!dbItem) {
                    // Document does not exist, insert it as a new object.
                    // We use findByIdAndUpdate with upsert to bypass Mongoose pre-save hooks 
                    // (e.g., to prevent double-encrypting passwords) while retaining schema casting.
                    const insertPayload = { ...item };
                    delete insertPayload._id; // _id is provided in the query
                    
                    await Model.findByIdAndUpdate(
                        item._id, 
                        { $set: insertPayload }, 
                        { upsert: true, setDefaultsOnInsert: false }
                    );
                    newRecords++;
                } else {
                    // Document exists, check for missing fields
                    let isUpdated = false;
                    const updateFields = {};
                    
                    for (const key of Object.keys(item)) {
                        if (key === '_id' || key === '__v') continue;
                        
                        // If the field is undefined in the DB, it means it's missing
                        if (dbItem.get(key) === undefined) {
                            updateFields[key] = item[key];
                            isUpdated = true;
                        }
                    }
                    
                    if (isUpdated) {
                        // Apply only the missing fields
                        await Model.findByIdAndUpdate(item._id, { $set: updateFields });
                        updatedRecords++;
                    }
                }
            }
            console.log(`-> ${name}: ${newRecords} new records inserted, ${updatedRecords} existing records updated with missing fields.`);
        }

        console.log('\nAll restorations completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during restoration:', error);
        process.exit(1);
    }
}

restoreBackups();
