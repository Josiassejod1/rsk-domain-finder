
import React from "react";
import { Card, CardBody, CardText, CardFooter } from "reactstrap";


export default function CryptoCardComponent (props) {
    const price = props.price;
    const coin = props.coin;
    const src = props.src || "./favicon.ico";

    return(
       <div style={{width: "250px", alignItems: "center"}} className="center">
        <Card outline={true}>
            <CardBody>
            <div>{coin} <img src={src} width="25" height="25"/></div>
            <CardText>Current Price: $ {price}</CardText>
            </CardBody>
            <CardFooter>
                <span>
                    Powered by Kucoin
                </span>
            </CardFooter>
        </Card>
       </div>
    );
}


