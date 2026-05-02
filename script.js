

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';
import dns from 'dns';

dotenv.config();

async function run() {
    try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
        await mongoose.connect(process.env.MONGO_URI);

        const result = await User.collection.updateMany(
            {},
            {
                $set: {
                    "memberships.$[elem].amount": 0
                }
            },
            {
                arrayFilters: [
                    {
                        "elem.amount": { $exists: false }
                    }
                ]
            }
        );

        console.log(result);

        process.exit(0);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

run();