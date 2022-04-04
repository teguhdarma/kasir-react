import React, { Component } from "react";
import { Col, ListGroup ,Row,Container} from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";

const Icon = ({nama})=> {
    if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
    if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2"/>
    if(nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2"/>
    return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
    
}


export default class ListCategories extends Component {


  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriygdipilih } = this.props
    return (
        <Container >
  <Row>
  <Col md="20" mt="2">
        <h4>
          <strong>kategori</strong>
        </h4>
        <hr />
        <ListGroup horizontal as="ul">
          {categories &&
            categories.map((category) => (
              <ListGroup.Item key={category.id} onClick={()=> changeCategory(category.nama)}
              className={categoriygdipilih=== category.nama && "active"}
              style={{cursor:'pointer'}}
              >
                <Icon nama={category.nama}/>  {category.nama}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
  </Row>
</Container>
      
    );
  }
}
