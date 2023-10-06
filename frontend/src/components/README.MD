# Aplicación CRUD de Usuarios con React

Esta es una aplicación web simple que permite a los usuarios realizar operaciones básicas en una lista de usuarios, como agregar, eliminar y actualizar. La aplicación está construida utilizando React y Axios para realizar solicitudes al servidor.

## Cómo funciona

### Importaciones

```javascript
import React, { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import axios from 'axios';

function App() {
  // Estado para almacenar la lista de usuarios y el nombre del nuevo usuario.
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');

  // useEffect se utiliza para cargar la lista de usuarios al iniciar la aplicación.
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Función para cargar usuarios desde el servidor.
  const cargarUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  // Función para agregar un nuevo usuario al servidor.
  const agregarUsuario = async () => {
    try {
      const response = await axios.post('http://localhost:5000/usuarios', { nombre: nuevoNombre });
      setUsuarios([...usuarios, response.data]);
      setNuevoNombre('');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  // Función para eliminar un usuario del servidor.
  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/usuarios/${id}`);
      const nuevosUsuarios = usuarios.filter((usuario) => usuario.id !== id);
      setUsuarios(nuevosUsuarios);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  // Función para actualizar el nombre de un usuario en el servidor.
  const actualizarUsuario = async (id, nombre) => {
    try {
      const response = await axios.put(`http://localhost:5000/usuarios/${id}`, { nombre });
      if (response.status === 200) {
        setUsuarios((usuarios) =>
          usuarios.map((usuario) => (usuario.id === id ? { ...usuario, nombre } : usuario))
        );
      }
      console.log(response);
    } catch (error) {
      console.log("error");
    }
  };

  // Renderizado de la aplicación.
  return (
    <div className="App">
      <h1>CRUD de Usuarios</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Nombre del usuario"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <button onClick={agregarUsuario}>Agregar</button>
      </div>
      <UserList usuarios={usuarios} onDelete={eliminarUsuario} onUpdate={actualizarUsuario} />
    </div>
  );
}

export default App;
``````
## explicacion 

React, useState, y useEffect son importados desde la biblioteca React para crear componentes y gestionar el estado.
('./App.css') importa un archivo de estilos para darle formato a la aplicación.
UserList es un componente personalizado que se utiliza para mostrar la lista de usuarios.
axios es una biblioteca que nos permite hacer solicitudes HTTP al servidor.


### ¿Qué es Axios?

---
Axios es una biblioteca de JavaScript que se utiliza en esta aplicación para realizar solicitudes HTTP a un servidor. En otras palabras, nos permite enviar y recibir datos desde y hacia el servidor web de una manera sencilla y eficiente. En este caso, utilizamos Axios para interactuar con el servidor que almacena la lista de usuarios.

### Componente Principal: App()
---
El componente App es el componente principal de la aplicación. Utiliza Axios para comunicarse con el servidor y realizar las siguientes operaciones:

Cargar la lista de usuarios desde el servidor al iniciar la aplicación.
Agregar un nuevo usuario al servidor.
Eliminar un usuario del servidor.
Actualizar el nombre de un usuario en el servidor.

### Resumen
---
Axios es una biblioteca que permite realizar solicitudes HTTP al servidor.
La aplicación utiliza Axios para interactuar con el servidor y gestionar la lista de usuarios.
El componente App se encarga de cargar, agregar, eliminar y actualizar usuarios en el servidor.