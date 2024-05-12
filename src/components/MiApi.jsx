import React from 'react'
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const MiApi = ({ comunaBuscada }) => {
  const [farmacias, setFarmacias] = useState([]);

  const url = "https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php";

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    data.sort((a, b) => a.comuna_nombre.localeCompare(b.comuna_nombre));
    setFarmacias(data);
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

  return (  
    <main>
      <Table bordered striped hover className='tabla-principal'>
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
    </main>
  );
};

export default MiApi;