// src/components/SearchList.js
import React from "react";
import Menus from "./Menus";
import { Col,Row } from "react-bootstrap";

function SearchList({ menus, masukkeranjang }) {

  const filtered = menus.map((menu) => <Menus key={menu.id} menu={menu} masukkeranjang={masukkeranjang} />);
  return <div>
      <Row>

          <Col>
          <div style={{display:"flex",flexWrap:"wrap"}}>
          {filtered}
          </div>
          
          </Col>
      </Row>
     
      </div>;

}

export default SearchList;
