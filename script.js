

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import Document from './models/document.model.js';
import dns from 'dns';

dotenv.config();

async function run() {
    try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
        await mongoose.connect(process.env.MONGO_URI);

        const result = await Document.collection.updateMany(
            { viewExpiry: { $exists: false } },
            {
                $set: {
                    viewExpiry: null
                }
            }
        );

        console.log(`Updated ${result.modifiedCount} documents. Added viewExpiry: null.`);

        process.exit(0);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

run();