import React, { Component } from "react";
import { Row, Col, ListGroup, Badge ,Button} from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "../utils/constant";
import axios from "axios";
import swal from "sweetalert"
export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: " ",
      totalHarga:0,
    };
  }
  handleShow = (menukeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menukeranjang,
      jumlah: menukeranjang.jumlah,
      keterangan: menukeranjang.keterangan,
      totalHarga:menukeranjang.totalharga
     
    });
  };
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };
  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:this.state.keranjangDetail.product.harga*(this.state.jumlah + 1)
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:this.state.keranjangDetail.product.harga*(this.state.jumlah - 1)
      });
    }
  };
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();
    const data = {
        jumlah: this.state.jumlah,
        totalharga: this.state.totalHarga,
        product: this.state.keranjangDetail.product,
        keterangan:this.state.keterangan
      };

      axios
        .put(API_URL + "keranjangs/"+this.state.keranjangDetail.id, data)
        .then((res) => {
          swal({
            title: "Update pesanan",
            text: "sukses update pesanan" + data.product.nama,
            icon: "success",
            button: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  };
  hapusPesanan = (id)=> {
    
    this.handleClose();
    

      axios
        .delete(API_URL + "keranjangs/"+id)
        .then((res) => {
          swal({
            title: "hapus pesanan!",
            text: "sukses hapus pesanan" + this.state.keranjangDetail.product.nama,
            icon: "error",
            button: false,
            timer:3000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <div>
        <Col md="2" mt="2">
          <hr />
        </Col>
        {keranjangs.length !== 0 && (
          <ListGroup>
            {keranjangs.map((menukeranjang) => (
              <ListGroup.Item
                key={menukeranjang.id}
                
              >
                <Row>
                  <Col xs={3}>
                    <h4>
                      <Badge pill variant="success">
                        {menukeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menukeranjang.product.nama}</h5>
                    <p>RP{numberWithCommas(menukeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp.{numberWithCommas(menukeranjang.totalharga)}
                    </strong>
                  </Col>
                  <Col>
                  <Button variant ="primary" onClick={() => this.handleShow(menukeranjang)}>edit</Button>
                  </Col>
                  <Col>
                  <Button variant="danger" onClick={()=>this.hapusPesanan(menukeranjang.id)}>
            <FontAwesomeIcon icon={faTrash}/>
            
            hapus
          </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
              hapusPesanan={this.hapusPesanan}
            />
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </div>
    );
  }
}
