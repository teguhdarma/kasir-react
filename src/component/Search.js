// src/components/Search.js

import React, { useState } from "react";

import SearchList from "./SearchList";
import { Col, Row, Container } from "react-bootstrap";

function Search({ details,masukkeranjang }) {
  const [searchField, setSearchField] = useState("");

  const menu = details.filter((menu) => {
    return (
      menu.nama.toLowerCase().includes(searchField.toLowerCase()) ||
      menu.category.nama.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return <SearchList menus={menu} masukkeranjang={masukkeranjang} />;
  }

  return (
    <Container className="mr-5">
      <Row　style={{marginLeft:"-50px"}}>
        <Col>
          <section className="garamond">
            <div className="navy georgia ma0 grow"></div>
            <div className="pa2 auto">
              <input
                className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                type="search"
                Placeholder="search you want"
                style={{ width: "100%" }}
                onChange={handleChange}
              />
            </div>


            {searchList()}
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
