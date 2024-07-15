import clientPromise from "./lib/mongodb";
import { cryptoItems } from "./crypto";
import { AnyBulkWriteOperation } from "mongodb";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  // total_volume: number;
  last_updated: string;
  fetched_at: string;
}

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const cryptoIds = cryptoItems.map((i) => i.id);

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&
      ids=${cryptoIds.join(",")}&per_page=5&page=1`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const cryptoData: CryptoData[] = await response.json();

    if (!cryptoData.length) return [];
    return cryptoData.map((i) => {
      return {
        id: i.id,
        symbol: i.symbol,
        market_cap: i.market_cap,
        name: i.name,
        current_price: i.current_price,
        last_updated: i.last_updated,
        fetched_at: new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

export const storeCryptoData = async (data: CryptoData[]): Promise<void> => {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("crypto_data");

    const bulkOps: AnyBulkWriteOperation<any>[] = data.map((doc: any) => ({
      updateOne: {
        filter: {
          id: doc.id,
          current_price: doc.current_price,
          last_updated: doc.last_updated,
        },
        update: { $set: doc },
        upsert: true,
      },
    }));

    const result = await collection.bulkWrite(bulkOps);

    // var bulk = collection.initializeOrderedBulkOp();
    // await collection.insertMany(data, { ordered: false });
  } catch (error) {
    console.log("error while storing data in db");
  }
};
