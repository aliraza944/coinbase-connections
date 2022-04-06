import "./App.css";
import { useEffect, useState } from "react";
import { coinbaseWallet, hooks } from "./connector";
import Web3 from "web3";
import { abi, CONTRACT_ADDRESS } from "./lottery";
const {
  useAccounts,

  useIsActivating,
  useIsActive,
  useProvider,
} = hooks;

function App() {
  const isActivating = useIsActivating();
  const accounts = useAccounts();
  const isActive = useIsActive();
  const provider = useProvider();
  const connectToCoinBase = async () => {
    try {
      await coinbaseWallet.activate();
      console.log(provider);
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

  const getManger = async () => {
    try {
      if (isActive) {
        const web3 = new Web3(window.ethereum);

        if (web3) {
          const accounts = await web3.eth.getAccounts();
          console.log(
            "🚀 ~ file: App.js ~ line 65 ~ getManger ~ accounts",
            accounts
          );

          const lottery = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

          console.log(
            "get the manager",
            await lottery.methods.manager().call()
          );
          const transaction = await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.1", "ether"),
          });
          if (transaction) {
            console.log(transaction);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendTrasaction = async () => {
    try {
      const web3 = new Web3(window.ethereum);

      if (web3) {
        const accounts = await web3.eth.getAccounts();
        console.log(
          "🚀 ~ file: App.js ~ line 65 ~ getManger ~ accounts",
          accounts
        );

        const lottery = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

        console.log("get the manager", await lottery.methods.manager().call());
        const transaction = await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei("0.1", "ether"),
        });
        if (transaction) {
          console.log(transaction);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Wallets check</h1>
      <h5>{isActive ? "Activated" : "Disconnect"}</h5>
      <h5>{accounts ? accounts : ""}</h5>

      <button onClick={disconnect}>Disconnect</button>
      <button onClick={connectToCoinBase} disabled={isActivating}>
        Connect To Coinbase
      </button>
      <button onClick={connectToMetamask}>Connect To Metamask</button>
      <button onClick={getManger}>Get Manager</button>
      <button onClick={sendTrasaction}>Metamask Transaction</button>
    </div>
  );
}

export default App;
