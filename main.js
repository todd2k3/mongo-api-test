/* Sample MongoDB Connection Test Script
  This site was used as reference
   https://github.com/mongodb-developer/nodejs-quickstart/blob/master/read.js
*/
const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost/sample_airbnb?retryWrites=true&w=majority";
    const client = new MongoClient(uri)
    try {
        console.log("connecting...");
        await client.connect();
        await findRecord(client, 'home')
    } catch (err) {
        console.error(err);
    } finally {
        await client.close()
    }
}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 * @param {String} id id to query on
 */
async function findRecord(client, id) {
    const result = await client.db("testdb").collection("testrecords").findOne({ id: id });

    if (result) {
        console.log(`Found a listing in the collection with the id '${id}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the id '${id}'`);
    }
}

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};