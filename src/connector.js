import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { initializeConnector } from "@web3-react/core";

export const [coinbaseWallet, hooks] = initializeConnector(
  (actions) =>
    new CoinbaseWallet(actions, {
      url: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`,
      appName: "web3-react",
    })
);
