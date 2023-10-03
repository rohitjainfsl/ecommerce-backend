import { MongoClient } from "mongodb";
const url = 'mongodb://127.0.0.1:27017';

export const dbName = 'ecommerce';

const connection = MongoClient.connect(url)
export default connection