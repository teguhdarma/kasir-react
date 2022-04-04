import React, { Component } from "react";
import { Row, Col, Container} from "react-bootstrap";
import Hasil from "../component/Hasil";
import ListCategories from "../component/ListCategories";
import NavbarComponent from "../component/NavbarComponent";
import Carasoul from "../component/Carasoul";

import { API_URL } from "../utils/constant";
import axios from "axios";
import swal from "sweetalert";
import Search from "../component/Search";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriygdipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriygdipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevState){
      if(this.state.keranjangs !== prevState.keranjangs){
        axios
        .get(API_URL + "keranjangs" )
        .then((res) => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch((error) => {
          console.log(error);
        });
      }
  }

  changeCategory = (value) => {
    this.setState({
      categoriygdipilih: value,
      menus: [],
      keranjangs: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(API_URL + "keranjangs" )
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  masukkeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            totalharga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "sukses",
                text: "sukses masuk keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            totalharga: res.data[0].totalharga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "sukses",
                text: "sukses masuk keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });

          axios
            .get(API_URL + "keranjangs")
            .then((res) => {
              const keranjangs = res.data;
              this.setState({ keranjangs });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.state.keranjangs);
  };

  render() {
    const { menus, categoriygdipilih, keranjangs } = this.state;
    return (
      <div className="Home">
        <NavbarComponent />
        
        <div className="mt-3 mb-4">
          <Container fluid>
            <Row>
              <Col>
                <ListCategories
                  changeCategory={this.changeCategory}
                  categoriygdipilih={categoriygdipilih}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <div>
        <Carasoul/>
        </div>
        <div className="mt-3 mb-4">
          <Container>
            <Row>
              <Col  >
                <h4 className="mt-5">
                  <strong>daftar product</strong>
                  <Search 
                    details={menus}
                    masukkeranjang={this.masukkeranjang}
                  />
                </h4>
                <hr />
              </Col>
            </Row>
          </Container>
          <div></div>
        </div>

        <div className="mt-3 mb-4">
          <Container>
            <Row>
              <Col>
                <Hasil keranjangs={keranjangs} {...this.props}/>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
