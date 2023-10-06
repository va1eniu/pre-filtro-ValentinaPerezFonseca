import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'semantic-ui-react';

export default function Coches() {
  const [coches, setCoches] = useState([]);
  const [formData, setFormData] = useState({
    modelo: '',
    año: '',
    precio: '',
    motor: {
      tipo: '',
      cilindrada: '',
      potencia: '',
    },
    coloresDisponibles: [],
  });
  const [editingCoche, setEditingCoche] = useState(null);

  const { modelo, año, precio, motor, coloresDisponibles } = formData;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/coches');
      setCoches(response.data);
    } catch (error) {
      console.error('Error al obtener coches', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCoche = async () => {
    try {
      if (editingCoche) {
        await axios.patch(`http://localhost:3000/coches/${editingCoche._id}`, formData);
      } else {
        await axios.post('http://localhost:3000/coches', formData);
      }
      fetchData();
      setFormData({
        modelo: '',
        año: '',
        precio: '',
        motor: {
          tipo: '',
          cilindrada: '',
          potencia: '',
        },
        coloresDisponibles: [],
      });
      setEditingCoche(null);
    } catch (error) {
      console.error('Error al agregar/actualizar coche', error);
    }
  };

  const handleDeleteCoche = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/coches/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar coche', error);
    }
  };

  const handleEditCoche = (id) => {
    const cocheToEdit = coches.find((coche) => coche._id === id);
    if (cocheToEdit) {
      setEditingCoche(cocheToEdit);
      setFormData({
        modelo: cocheToEdit.modelo,
        año: cocheToEdit.año,
        precio: cocheToEdit.precio,
        motor: {
          tipo: cocheToEdit.motor.tipo,
          cilindrada: cocheToEdit.motor.cilindrada,
          potencia: cocheToEdit.motor.potencia,
        },
        coloresDisponibles: cocheToEdit.coloresDisponibles.join(', '),
      });
    }
  };

  return (
    <div>
      <h1>Coches Disponibles</h1>
      <Form>
        <Form.Field>
          <label>Modelo</label>
          <input
            type="text"
            name="modelo"
            value={modelo}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Año</label>
          <input
            type="text"
            name="año"
            value={año}
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
        <Form.Field>
          <label>Tipo de Motor</label>
          <input
            type="text"
            name="motor.tipo"
            value={motor.tipo}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Cilindrada del Motor</label>
          <input
            type="text"
            name="motor.cilindrada"
            value={motor.cilindrada}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Potencia del Motor</label>
          <input
            type="text"
            name="motor.potencia"
            value={motor.potencia}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Colores Disponibles</label>
          <input
            type="text"
            name="coloresDisponibles"
            value={coloresDisponibles}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button onClick={handleAddCoche}>
          {editingCoche ? 'Actualizar Coche' : 'Agregar Coche'}
        </Button>
      </Form>

      <div className="card-container">
        {coches.map((coche) => (
          <Card key={coche._id}>
            <Card.Content>
              <Card.Header>{coche.modelo}</Card.Header>
              <Card.Meta>Año: {coche.año}</Card.Meta>
              <Card.Description>
                Precio: {coche.precio}
                <br />
                Tipo de Motor: {coche.motor.tipo}
                <br />
                Cilindrada: {coche.motor.cilindrada}
                <br />
                Potencia: {coche.motor.potencia}
                <br />
                Colores Disponibles: {coche.coloresDisponibles.join(', ')}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  onClick={() => handleEditCoche(coche._id)}
                >
                  Editar
                </Button>
                <Button
                  basic
                  color="red"
                  onClick={() => handleDeleteCoche(coche._id)}
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
