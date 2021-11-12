import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import RNS from '@rsksmart/rns'
import { ChainId } from '@rsksmart/rns/types'
import React, {createRef, useState} from "react";
import RSK_PUBLIC_ADDRESS from "./shared/consts";
import { Button, Form, FormGroup, Footer, Input, InputGroupText, InputGroup, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Home() {
  const web3 = new Web3('https://public-node.rsk.co')
  const rns = new RNS(web3)
  const [domain, setDomain] = useState("");
  const [available, setDomainAvailablity] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    rns.available(domain + ".rsk").then( e => {
      console.log(e);
      setDomainAvailablity(e);
    }).catch((e) => setError(e.message));
    event.preventDefault();
  }

  function handleChange(event) {
    setDomainAvailablity(null);
    setError(null);
    console.log(event.target.value);
    setDomain(event.target.value);
  }


  return (
   <div className="container">
     <h1 style={{"paddingBottom": "30px"}}>
       RNS Domain Creator
     </h1>
     <Form onSubmit={handleSubmit} className="center">
     <FormGroup>
        <InputGroup style={{"paddingBottom": "30px"}}>
        <Input type="text"  value={domain} onChange={handleChange} id="domain" />
        <InputGroupText>
          rsk
        </InputGroupText>
        </InputGroup>

        {
           (available == false && available != null) &&  <Alert color="warning">
           Oh no! that name is already taken
         </Alert>
         }
        
        {(available == true)&& <Alert >
          Domain name is available
        </Alert>
        }
        {
          (error != "" && error != null) && <Alert color="danger">
             {error}
          </Alert>
        }
  
        <Button>Submit</Button>

       

     </FormGroup>
   </Form>
  <footer className="footer fixed-bottom ">
    <div className="container">
      <span style={{margin: 5}}className="text-muted">Created by <a href="https://www.dalvindigital.com" target="_blank"  rel="noreferrer">Dalvin Digital Design</a></span>
    </div>
  </footer>
   </div>
  )
}
