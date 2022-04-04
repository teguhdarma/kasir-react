import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import { numberWithCommas } from "../utils/utils";

export default class TotalBayar extends Component {
    submittoatalbayar =(totalbayar)=>
    {
        const pesanan ={
            total_bayar:totalbayar,
            menus:this.props.keranjangs
        }
        axios.post(API_URL+"pesanans",pesanan).then((res)=>{
            this.props.history.push("/sukses")
        })
    }
  render() {
    const totalbayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.totalharga;
    }, 0);
    return (
      <div>
        <Row>
          <Col>
            <h2>total harga : Rp.{numberWithCommas(totalbayar)}</h2>
          </Col>
        </Row>
        <Button variant="primary" block className="mb-2 mt-4 mr-2" size="lg" onClick={()=> this.submittoatalbayar(totalbayar)}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <strong>bayar</strong>
        </Button>
      </div>
    );
  }
}
