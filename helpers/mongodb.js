import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const clientdb = await MongoClient.connect(
    "mongodb+srv://adrienbns:nrY3m7Alpdo2PNet@cluster0.uldqk1d.mongodb.net/Portfolio?retryWrites=true&w=majority"
  );

  return clientdb;
}
