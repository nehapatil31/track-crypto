"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Provider } from "react-redux";
import { refreshPage, setSelectedCrypto } from "../../store/cryptoSlice";
import { store, useAppDispatch } from "../../store/store";
import CryptoFilter from "./Filter";
import "./styles.css";

const FilterModalComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [cryptoValue, setCryptoValue] = useState("bitcoin");
  const changeCrypto = function () {
    dispatch(setSelectedCrypto(cryptoValue));
    dispatch(refreshPage());
  };
  return (
    <Provider store={store}>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="Button violet">Change crypto</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Change crypto</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Select crypto to check it&apos;s latest price changes.
            </Dialog.Description>
            <CryptoFilter
              cryptoValue={cryptoValue}
              setCryptoValue={setCryptoValue}
            />
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            >
              <Dialog.Close asChild>
                <button className="Button violet" onClick={changeCrypto}>
                  Save changes
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Provider>
  );
};

const FilterModal = () => (
  <Provider store={store}>
    <FilterModalComponent />
  </Provider>
);

// export default CryptoTable;

export default FilterModal;
