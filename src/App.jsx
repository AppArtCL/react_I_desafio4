import { useState } from 'react'
import MiApi from "./components/MiApi";
import Buscador from "./components/Buscador";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  const [comuna, setComuna] = useState("")

  const handleComuna = (data) => {
    setComuna(data);
  };


  return (
    <>
      <header>
        <p className="titulo ubuntu-bold"><i className="fa-solid fa-prescription-bottle-medical logo"></i> Farmacias de turno</p>
      </header>
      <Buscador comunaBuscada={handleComuna} />
      <MiApi comunaBuscada={comuna} />
      <footer>
        <p>La información de esta página es responsabilidad de Datos.gob el portal centralizado de datos de Gobierno de Chile.</p>
        <p>© Todos los derechos reservados Cristian Díaz</p>
      </footer>
    </>
  );
}

export default App;