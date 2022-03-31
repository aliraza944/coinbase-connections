import "./App.css";
import { useEffect, useState } from "react";
import { coinbaseWallet, hooks } from "./connector";
import Web3 from "web3";
const {
  useAccounts,

  useIsActivating,
} = hooks;

function App() {
  const isActivating = useIsActivating();
  const accounts = useAccounts();

  const connectToCoinBase = async () => {
    try {
      await coinbaseWallet.activate();
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = async () => {
    try {
      await coinbaseWallet.deactivate();
    } catch (error) {
      console.log(error);
    }
  };

  const connectToMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      let provider = window.ethereum;
      // edge case if MM and CBW are both installed
      if (window.ethereum.providers?.length) {
        window.ethereum.providers.forEach(async (p) => {
          if (p.isMetaMask) provider = p;
        });
      }
      await provider.request({
        method: "eth_requestAccounts",
        params: [],
      });
    }
  };

  useEffect(() => {
    coinbaseWallet.connectEagerly();
  }, []);

  return (
    <div className="App">
      <h1>Wallets check</h1>
      <h5>{accounts ? accounts : ""}</h5>
      <button onClick={disconnect}>Disconnect</button>
      <button onClick={connectToCoinBase} disabled={isActivating}>
        Connect To Coinbase
      </button>
      <button onClick={connectToMetamask} disabled={isActivating}>
        Connect To Metamask
      </button>
    </div>
  );
}

export default App;
