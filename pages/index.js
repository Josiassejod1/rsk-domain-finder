import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import RNS from '@rsksmart/rns'
import { ChainId } from '@rsksmart/rns/types'
import React, {createRef, useState} from "react";
import RSK_PUBLIC_ADDRESS from "./shared/consts";
import { Button, Form, FormGroup, Label, Input, InputGroupText, InputGroup } from 'reactstrap';
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
     <Form onSubmit={handleSubmit} className="center">
     <FormGroup>
     <Label for="domain" className="column">
        <InputGroup>
        <Input type="text"  value={domain} onChange={handleChange} id="domain" />
        <InputGroupText>
          rsk
        </InputGroupText>
        </InputGroup>
      </Label>
         {
           (available == false ) &&  <p>
           Oh no! that name is already taken
         </p>
         }
        {available && <p>
          Domain name is valid
        </p>
        }
        {
          error != "" && <p>
             {error}
          </p>
        }
        <Button>Submit</Button>

     </FormGroup>
   </Form>
   </div>
  )
}
