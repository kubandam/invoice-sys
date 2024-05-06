import mongoose from 'mongoose';
import fs from 'fs';

// add other collections
const collections = ["User"];

var saved = false
var imported = false

const exportDatabaseData = async () => {
    if(!saved){
        try {
            const db = mongoose.connection;
            const exportedData = {} as any;
            for (const collectionName of collections) {
                const model = db.model(collectionName);
                exportedData[collectionName] = await model.find().lean();
            }
            fs.writeFileSync("db.json", JSON.stringify(exportedData));
            console.log("Database exported to db.json");
        } catch (error) {
            console.error("Error exporting database:", error);
        }
    }
    saved = true
};

const readJsonFile = (filePath:string) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading JSON file:", error);
        throw error;
    }
};

const dropCollections = async () => {
    try {
        const collections = mongoose.connection.collections;
        for (const collectionName in collections) {
            await collections[collectionName].drop();
            console.log(`Dropped collection ${collectionName}`);
        }
    } catch (error) {
        console.error("Error dropping collections:", error);
        throw error;
    }
};

const importDatabaseData = async () => {
    if(!imported){
        try {
            await dropCollections();
            const db = mongoose.connection;
            const importedData = readJsonFile("db.json");
            for (const [collectionName, collectionData] of Object.entries(importedData)) {
                const model = db.model(collectionName);
                await model.insertMany(collectionData);
            }
            console.log("Data imported successfully");
        } catch (error) {
            console.error("Error importing data into database:", error);
        } 
    }
    imported = true
};

export default defineNuxtPlugin(async () => {
    //importDatabaseData()
    //exportDatabaseData()
});