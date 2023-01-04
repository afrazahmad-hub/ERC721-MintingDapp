import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
// import Wallet from "./wallet";
import { ethers } from "ethers";
import contract_data from "./contract_data";

function App() {
  let ethereum = window.ethereum;

  const [address, setAddress] = useState("Connet Matamask");

  const [balance, setBalance] = useState("Account Balance");

  const infuraProvider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/7c02737cf5f14c60899538534507f28c"
  );

  const walletProvider = new ethers.providers.Web3Provider(ethereum);

  const getContractData = new ethers.Contract(
    contract_data.contract_address,
    contract_data.contract_ABI,
    infuraProvider
  );

  const contractTransation = new ethers.Contract(
    contract_data.contract_address,
    contract_data.contract_ABI,
    walletProvider.getSigner()
  );

  const mint = async () => {
    try {
      let _mint = await contractTransation.mintNFT();
      return _mint;
    } catch (error) {
      console.log("ERROR Message", error);
    }
  };

  // const supply = async () => {
  //   try {
  //     const _totalSupply = await getContractData.totalSupply();
  //     return _totalSupply;
  //   } catch (error) {
  //     console.log("ERRORrr: ", error);
  //   }
  // };

  async function wallet() {
    await ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });

    const Accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setAddress(Accounts[0]);

    const Balance = await ethereum.request({
      method: "eth_getBalance",
      params: [Accounts[0], "latest"],
    });
    setBalance(ethers.utils.formatEther(Balance));
  }
  return (
    <div className="App">
      <a className="App-comp" onClick={wallet}>
        {address}
      </a>
      <br />
      <br />
      <a className="App-comp">{balance}</a>
      <br />
      <br />

      <button className="Btn-comp" onClick={() => mint()}>
        Mint NFT
      </button>
      <br />
      <br />
      {/* <button className="App-compp" onClick={() => supply()}>
        Total Supply
      </button> */}
    </div>
  );
}

export default App;
