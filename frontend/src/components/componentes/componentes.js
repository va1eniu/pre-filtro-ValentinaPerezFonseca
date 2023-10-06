import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'semantic-ui-react';

export default function Componentes() {
  const [componentes, setComponentes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    descripcion: '',
    precio: '',
  });
  const [editingComponente, setEditingComponente] = useState(null);

  const { nombre, tipo, descripcion, precio } = formData;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/componentes');
      setComponentes(response.data);
    } catch (error) {
      console.error('Error al obtener componentes', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddComponente = async () => {
    try {
      if (editingComponente) {
        await axios.patch(`http://localhost:3000/componentes/${editingComponente._id}`, formData);
      } else {
        await axios.post('http://localhost:3000/componentes', formData);
      }
      fetchData();
      setFormData({
        nombre: '',
        tipo: '',
        descripcion: '',
        precio: '',
      });
      setEditingComponente(null);
    } catch (error) {
      console.error('Error al agregar/actualizar componente', error);
    }
  };

  const handleDeleteComponente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/componentes/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar componente', error);
    }
  };

  const handleEditComponente = (id) => {
    const componenteToEdit = componentes.find((componente) => componente._id === id);
    if (componenteToEdit) {
      setEditingComponente(componenteToEdit);
      setFormData({
        nombre: componenteToEdit.nombre,
        tipo: componenteToEdit.tipo,
        descripcion: componenteToEdit.descripcion,
        precio: componenteToEdit.precio,
      });
    }
  };

  return (
    <div>
      <h1>Componentes</h1>
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
          <label>Tipo</label>
          <input
            type="text"
            name="tipo"
            value={tipo}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={descripcion}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Precio</label>
          <input
            type="text"
            name="precio"
            value={precio}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button onClick={handleAddComponente}>
          {editingComponente ? 'Actualizar Componente' : 'Agregar Componente'}
        </Button>
      </Form>

      <div className="card-container">
        {componentes.map((componente) => (
          <Card key={componente._id}>
            <Card.Content>
              <Card.Header>{componente.nombre}</Card.Header>
              <Card.Meta>Tipo: {componente.tipo}</Card.Meta>
              <Card.Description>
                Descripción: {componente.descripcion}
                <br />
                Precio: {componente.precio}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  onClick={() => handleEditComponente(componente._id)}
                >
                  Editar
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={() => handleDeleteComponente(componente._id)}
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
