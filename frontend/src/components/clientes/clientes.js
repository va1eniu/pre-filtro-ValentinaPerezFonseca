import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'semantic-ui-react';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    cochesComprados: '',
  });
  const [editingCliente, setEditingCliente] = useState(null);

  const { nombre, correo, telefono, cochesComprados } = formData;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener clientes', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCliente = async () => {
    try {
      if (editingCliente) {
      
        await axios.patch(`http://localhost:3000/clientes/${editingCliente._id}`, formData);
      } else {
    
        await axios.post('http://localhost:3000/clientes', formData);
      }
      fetchData();
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        cochesComprados: '',
      });
      setEditingCliente(null);
    } catch (error) {
      console.error('Error al agregar/actualizar cliente', error);
    }
  };

  const handleDeleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/clientes/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar cliente', error);
    }
  };


  const handleEditCliente = (id) => {
    const clienteToEdit = clientes.find((cliente) => cliente._id === id);
    if (clienteToEdit) {
      setEditingCliente(clienteToEdit);
      setFormData({
        nombre: clienteToEdit.nombre,
        correo: clienteToEdit.correo,
        telefono: clienteToEdit.telefono,
        cochesComprados: clienteToEdit.cochesComprados.join(', '),
      });
    }
  };

  return (
    <div>
      <h1>Clientes</h1>
      <Form>
        <Form.Field>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Correo</label>
          <input
            type="text"
            name="correo"
            value={correo}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={telefono}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Coches Comprados</label>
          <input
            type="text"
            name="cochesComprados"
            value={cochesComprados}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button onClick={handleAddCliente}>
          {editingCliente ? 'Actualizar Cliente' : 'Agregar Cliente'}
        </Button>
      </Form>

     {/*  <div>
        {searchResult && (
          <Card>
            <Card.Content>
              <Card.Header>{searchResult.nombre}</Card.Header>
              <Card.Meta>{searchResult.correo}</Card.Meta>
              <Card.Description>
                Teléfono: {searchResult.telefono}
                <br />
                Coches Comprados: {searchResult.cochesComprados.join(', ')}
              </Card.Description>
            </Card.Content>
          </Card>
        )}
      </div> */}

      <div className="card-container">
        {clientes.map((cliente) => (
          <Card key={cliente._id}>
            <Card.Content>
              <Card.Header>{cliente.nombre}</Card.Header>
              <Card.Meta>{cliente.correo}</Card.Meta>
              <Card.Description>
                Teléfono: {cliente.telefono}
                <br />
                Coches Comprados: {cliente.cochesComprados.join(', ')}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  onClick={() => handleEditCliente(cliente._id)}
                >
                  Editar
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={() => handleDeleteCliente(cliente._id)}
                >
                  Eliminar
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
