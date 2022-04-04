
import React, { Component } from 'react'
import axios from "axios";
import { API_URL } from "../utils/constant";
import {
    BrowserRouter as Router,
    
    Link,
   
  } from "react-router-dom";
import {Button,Image} from "react-bootstrap"

export default class sukses extends Component {
    componentDidMount(){
        axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const keranjangs = res.data;
          keranjangs.map(function(item){
              return axios
              .delete(API_URL+"keranjangs/"+item.id)
              .then((res)=>console.log(res))
              .catch((error)=>console.log(error))
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="assets/images/sukses.png" width="400" />
                <h2>sukses pesan </h2>
                <p>terima kasih sudah memesan</p>
                <Button variant="primary" as={Link} to="/">
                    kembali
                </Button>
            </div>
        )
    }
}
