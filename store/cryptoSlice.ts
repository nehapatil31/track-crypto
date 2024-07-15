// store/cryptoSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  last_updated: string;
  market_cap: number;
  fetched_at: string;
  // total_volume: number;
}

interface CryptoState {
  selectedCrypto: string;
  data: CryptoData[];
}

let selectedCryptoName = "bitcoin";
if (typeof window !== "undefined") {
  selectedCryptoName = localStorage.getItem("selectedCrypto") || "bitcoin";
}

const initialState: CryptoState = {
  selectedCrypto: selectedCryptoName,
  data: [],
};

export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async (cryptoId: string) => {
    const response = await fetch(`/api/crypto/${cryptoId}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  }
);
export const refreshPage = () => {
  return (dispatch: any) => {
    dispatch({ type: "REFRESH_PAGE" });
    window.location.reload();
  };
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSelectedCrypto: (state, action: PayloadAction<string>) => {
      state.selectedCrypto = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("selectedCrypto", action.payload);
      }
    },
    updateCryptoData: (state, action: PayloadAction<CryptoData[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCryptoData.fulfilled,
      (state, action: PayloadAction<CryptoData[]>) => {
        state.data = action.payload;
      }
    );
  },
});

export const { setSelectedCrypto, updateCryptoData } = cryptoSlice.actions;

export const selectSelectedCrypto = (state: RootState) =>
  state.crypto.selectedCrypto;
export const selectCryptoData = (state: RootState) => state.crypto.data;

export default cryptoSlice.reducer;
