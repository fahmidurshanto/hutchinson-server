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

async function createBackups() {
    try {
        console.log('Connecting to database...');
        dns.setServers(['8.8.8.8', '1.1.1.1']);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database.');

        const backupDir = path.join(__dirname, 'Backup');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        // Loop through each model and save data
        for (const [name, Model] of Object.entries(models)) {
            console.log(`Fetching data for ${name} model...`);
            // .lean() ensures we get plain JavaScript objects with _id included
            const data = await Model.find({}).lean(); 
            
            const filePath = path.join(backupDir, `${name}.json`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log(`Successfully backed up ${data.length} records to ${filePath}`);
        }

        console.log('\nAll backups completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during backup:', error);
        process.exit(1);
    }
}

createBackups();
