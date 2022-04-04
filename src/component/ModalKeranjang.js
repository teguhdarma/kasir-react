import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
  totalHarga,
  hapusPesanan,
}) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetail.product.nama}{" "}
            <p>
              <strong>
                Rp.{numberWithCommas(keranjangDetail.product.harga)}
              </strong>
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>total harga</Form.Label>
              <p>
                <strong>Rp.{numberWithCommas(totalHarga)}</strong>
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>jumlah:</Form.Label>
              <br />
              <Button
                variant="primary"
                size="sm"
                className="ml-2"
                onClick={() => kurang(jumlah)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong>{jumlah}</strong>

              <Button
                variant="primary"
                size="sm"
                className="mr-2"
                onClick={() => tambah(jumlah)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>keterangan:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="keterangan"
                placeholder="contoh:pedas, nasi setengah"
                value={keterangan}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => hapusPesanan(keranjangDetail.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
            hapus
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
