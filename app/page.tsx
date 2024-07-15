import { initPolling } from "@/lib/dataPolling";
import CryptoTable from "./components/CryptoTable";
import FilterModal from "./components/FilterModal";

export default function Home() {
  initPolling();
  return (
    <div>
      <FilterModal />
      <br />
      <br />
      <CryptoTable />
    </div>
  );
}
