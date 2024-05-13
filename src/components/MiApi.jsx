import React from 'react'
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';

const MiApi = ({ comunaBuscada }) => {
  const [farmacias, setFarmacias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const url = "https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php";

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFarmacias(eliminaDuplicados(data).sort((a, b) => a.comuna_nombre.localeCompare(b.comuna_nombre)));
    } catch (error) {
      console.error("Failed to fetch data: ", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const eliminaDuplicados = (farmacias) => {
    const unicos = new Map(farmacias.map(farmacia => [farmacia.local_id, farmacia]));
    return Array.from(unicos.values());
  };

  const capitalizar = (palabra) => {
    return palabra
      .toLowerCase()
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  };

  let results = [];
  if (!comunaBuscada) {
    results = farmacias;
  } else {
    results = farmacias.filter((farmacia) =>
      farmacia.comuna_nombre.toLowerCase().includes(comunaBuscada.toLowerCase())
    );
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" variant="danger">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <main>
      {error != "" ? (
        <div className='error'>
          <p>Hubo un error en la carga: {error}</p>
          <p>Disculpe las molestias.</p>
        </div>
      ) : (
        <Table bordered striped hover className="tabla-principal">
          <thead className="ubuntu-bold">
            <tr>
              <th>Comuna</th>
              <th>Dirección</th>
              <th>Local</th>
              <th>Mapa</th>
            </tr>
          </thead>

          <tbody className="ubuntu-light">
            {results.map((farmacia) => (
              <tr key={farmacia.local_id}>
                <td>{capitalizar(farmacia.comuna_nombre)}</td>
                <td>{capitalizar(farmacia.local_direccion)}</td>
                <td>{capitalizar(farmacia.local_nombre)}</td>
                <td>
                  <a
                    href={`https://www.google.com/maps/place/${farmacia.local_lat},${farmacia.local_lng}/@${farmacia.local_lat},${farmacia.local_lng},18z/data=!3m1!1e3`}
                    target="_blank">
                    <i className="fa-solid fa-location-dot mapa"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </main>
  );
};

export default MiApi;