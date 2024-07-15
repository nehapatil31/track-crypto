"use client";
import { Table } from "@radix-ui/themes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import {
  fetchCryptoData,
  selectCryptoData,
  selectSelectedCrypto,
  updateCryptoData,
} from "../../store/cryptoSlice";
import { useAppDispatch } from "../../store/store";

const CryptoTableComponent = () => {
  const dispatch = useAppDispatch();
  const selectedCrypto = useSelector(selectSelectedCrypto);
  const cryptoData = useSelector(selectCryptoData);

  useEffect(() => {
    dispatch(fetchCryptoData(selectedCrypto));

    const interval = setInterval(() => {
      dispatch(fetchCryptoData(selectedCrypto)).then((action) => {
        if (fetchCryptoData.fulfilled.match(action)) {
          dispatch(updateCryptoData(action.payload));
        }
      });
    }, 90000); // 1 minute interval

    return () => clearInterval(interval);
  }, [dispatch, selectedCrypto]);
  if (!cryptoData || !cryptoData.length) {
    return <p>No data available.</p>;
  }
  return (
    <Provider store={store}>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Market cap</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last updated</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fetched at</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cryptoData.map((crypto) => (
            <Table.Row key={crypto.id}>
              <Table.Cell>
                {crypto.name}
                <br />
                <span>({crypto.symbol})</span>
              </Table.Cell>
              <Table.Cell>${crypto.current_price}</Table.Cell>
              <Table.Cell>${crypto.market_cap}</Table.Cell>
              <Table.Cell>
                {new Date(crypto.last_updated).toLocaleString("en-US")}
              </Table.Cell>
              <Table.Cell>
                {new Date(crypto.fetched_at).toLocaleString("en-US")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Provider>
  );
};

const CryptoTable = () => (
  <Provider store={store}>
    <CryptoTableComponent />
  </Provider>
);

export default CryptoTable;
