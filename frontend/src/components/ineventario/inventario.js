import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'semantic-ui-react';

export default function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [formData, setFormData] = useState({
    coche: '',
    cantidad: 0,
  });
  const [editingItem, setEditingItem] = useState(null);

  const { coche, cantidad } = formData;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/inventario');
      setInventario(response.data);
    } catch (error) {
      console.error('Error al obtener inventario', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = async () => {
    try {
      if (editingItem) {
        await axios.patch(`http://localhost:3000/inventario/${editingItem._id}`, formData);
      } else {
        await axios.post('http://localhost:3000/inventario', formData);
      }
      fetchData();
      setFormData({
        coche: '',
        cantidad: 0,
      });
      setEditingItem(null);
    } catch (error) {
      console.error('Error al agregar/actualizar item de inventario', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/inventario/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar item de inventario', error);
    }
  };

  const handleEditItem = (id) => {
    const itemToEdit = inventario.find((item) => item._id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setFormData({
        coche: itemToEdit.coche,
        cantidad: itemToEdit.cantidad,
      });
    }
  };

  return (
    <div>
      <h1>Inventario</h1>
      <Form>
        <Form.Field>
          <label>Coche</label>
          <input
            type="text"
            name="coche"
            value={coche}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={cantidad}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button onClick={handleAddItem}>
          {editingItem ? 'Actualizar Item' : 'Agregar Item'}
        </Button>
      </Form>

      <div className="card-container">
        {inventario.map((item) => (
          <Card key={item._id}>
            <Card.Content>
              <Card.Header>{item.coche}</Card.Header>
              <Card.Description>
                Cantidad: {item.cantidad}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  onClick={() => handleEditItem(item._id)}
                >
                  Editar
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={() => handleDeleteItem(item._id)}
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
