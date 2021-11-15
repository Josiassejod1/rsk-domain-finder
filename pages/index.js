
import React, {createRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { injected } from './component/wallet/connector';
import { useWeb3React } from "@web3-react/core";
import Domain from "./component/Domain";



export default function Home() {
  const {active, account, library, activate, deactivate} = useWeb3React();
  async function connect() {
    try {
        await activate(injected);
    } catch(ex) {
        console.log(ex);
    }
  }



  return (
   <Domain />
  );
}
