import "./App.css";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { coinbaseWallet, hooks } from "./connector";
const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

function App() {
  const { active, activate, chainId, account } = useWeb3React();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
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
    </div>
  );
}

export default App;
