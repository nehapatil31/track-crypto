"use client";

import { cryptoItems } from "@/crypto";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useSelector } from "react-redux";
import { selectSelectedCrypto } from "../../store/cryptoSlice";

const CryptoFilter = ({
  cryptoValue,
  setCryptoValue,
}: {
  cryptoValue: string;
  setCryptoValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const selectedCrypto = useSelector(selectSelectedCrypto);
  return (
    <div className="CryptoSelect">
      <Select.Root
        defaultValue={selectedCrypto}
        onValueChange={(value: string) => {
          setCryptoValue(value);
        }}
      >
        <Select.Trigger placeholder="Filter by crypto..."></Select.Trigger>
        <Select.Content>
          {cryptoItems.map((crypto) => (
            <Select.Item key={crypto.id} value={crypto.id}>
              {crypto.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default CryptoFilter;
