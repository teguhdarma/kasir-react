import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";


const Menus = ({ menu, masukkeranjang,menukeranjang }) => {
  return (
  
    <Col  md={3} xs={12} style={{padding:"5px"}}>
      <Card className="shadow" >
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
            <strong>
                <h4>
                {menu.nama}
                </h4>
           
            </strong>
          
          <Card.Text>
            {menu.info}
            <br />
          </Card.Text>
          <Card.Text>RP{numberWithCommas(menu.harga)}</Card.Text>
          <Button variant="primary"onClick={() => masukkeranjang (menu)}>beli</Button>

          <Button variant ="primary" onClick={() => this.handleShow(menukeranjang)}>edit</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
