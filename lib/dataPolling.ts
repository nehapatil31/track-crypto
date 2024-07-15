import { fetchCryptoData, storeCryptoData } from "@/utils";

const POLL_INTERVAL = 90000; // 90 seconds

const pollData = async () => {
  try {
    const data = await fetchCryptoData();
    console.log("data pulled-----------");

    if (data && data.length) {
      await storeCryptoData(data);
      console.log("data stored-----------");
    }
  } catch (error) {
    console.log("Error in fetching and storing data");
  }
};

const startPolling = () => {
  pollData(); // Initial fetch
  setInterval(pollData, POLL_INTERVAL);
};

export const initPolling = () => {
  console.log("start polling");
  startPolling();
};
