import React, { useState, useEffect } from "react";
import { css, cx } from "../../styled-system/css";
import { center, grid } from "../../styled-system/patterns";
import { createPortal } from "react-dom";
import { currenciesArr } from "../contents/coins";
import { CoinItem } from "./CoinItem";
import goldCoinSvg from "../assets/gold-coin.svg";
import expoCloseIconSvg from "../assets/expo-close-icon.svg";
import Modal from "./Modal";

const coinWidth = 32;
const coinSx = css({
  width: `${coinWidth}px`,
  height: `${coinWidth}px`,
  textTransform: "uppercase",
  fontWeight: 900,
  cursor: "pointer",
  transition: "all 600ms ease",
  "&.actived": {
    opacity: 1,
    transform: "scale(1.2)",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
});

const currencyGridSx = grid({
  gridTemplateColumns: { base: "repeat(auto-fill, minmax(140px, 1fr))", md: "repeat(auto-fill, minmax(180px, 1fr))" },
  gap: { base: "20px", md: "30px" },
});

const currencyItemSx = css({
  display: "flex",
  // flexDirection: 'column',
  alignItems: "center",
  gap: "8px",
});

const currencyNameSx = css({
  fontSize: "14px",
  color: "#000",
  lineHeight: "100%",
  fontWeight: 900,
});

export const CurrencyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Currency supported" showClose showTitle> 
      <div className={currencyGridSx}>
        {currenciesArr.map((currency) => (
          <div key={currency.id} className={currencyItemSx}>
            <CoinItem coin={currency.id} index={0} coinWidth={32} goldCoinSvg={goldCoinSvg} coinSx={coinSx} />
            <div className={currencyNameSx}>{currency.name}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default CurrencyModal;
