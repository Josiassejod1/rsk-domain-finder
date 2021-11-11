import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import RNS from '@rsksmart/rns'
import { ChainId } from '@rsksmart/rns/types'
import React, {createRef, useState} from "react";
import RSK_PUBLIC_ADDRESS from "./shared/consts";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
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
   <Form onSubmit={handleSubmit}>
     <FormGroup>
     <Label for="domain">
        RSK Domain: 
        <Input type="text"  value={domain} onChange={handleChange} id="domain" />
        <Input type="button" value="rsk" disabled={true} />
         {
           (available == false ) &&  <FormFeedback>
           Oh no! that name is already taken
         </FormFeedback>
         }
        {available && <FormFeedback valid>
          Domain name is valid
        </FormFeedback>
        }
        {
          error != "" && <FormFeedback invalid>
          {error}
        </FormFeedback>
        }
        <Button>Submit</Button>
      </Label>
     </FormGroup>
   </Form>
  )
}
