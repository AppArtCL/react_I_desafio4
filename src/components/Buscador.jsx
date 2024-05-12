import React from "react";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const Buscador = ({ comunaBuscada }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    comunaBuscada(e.target.value)
  };

  return (
    <Form>
      <Form.Group className="mb-3 grupo-comuna" controlId="formPlaintextComuna">
        <Form.Label>Buscador de comunas</Form.Label>

        <Form.Control
          type="text"
          placeholder="Ingresa una comuna"
          className="comuna"
          value={search}
          onChange={handleSearch}
        />
      </Form.Group>
    </Form>
  );
};

export default Buscador;