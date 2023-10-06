import React from 'react';
import './App.css';
import Coches from './components/coches/coches.js';
import Clientes from './components/clientes/clientes.js';
import Componentes from './components/componentes/componentes.js';

import ComprasComponentes from './components/comprasComponentes/comprasComponentes.js';
 import Inventario from './components/ineventario/inventario.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importa el logo
import logo from './logo.png';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
        <div className='logoo'>
       <img src={logo} alt="Logo" className="logo" />
       
       </div>
          <Link to="/coches">Coches</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/componentes">Componentes</Link>
          <Link to="/componentesCompras">Componentes de Compras</Link>
          <Link to="/inventario">Inventario</Link>
        </nav>
      </div>
      <Routes>
       <Route path="/coches" element={<Coches />} /> 
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/componentes" element={<Componentes/>} />
       <Route path="/componentesCompras" element={<ComprasComponentes/>} />
         <Route path="/inventario" element={<Inventario />} /> 
      </Routes>
    </Router>
  );
}

export default App;
