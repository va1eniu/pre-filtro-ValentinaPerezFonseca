import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'semantic-ui-react';

export default function ComprasComponentes() {
  const [comprasComponentes, setComprasComponentes] = useState([]);
  const [formData, setFormData] = useState({
    fechaCompra: '',
    proveedor: '',
    componentesComprados: [],
  });
  const [editingCompraComponente, setEditingCompraComponente] = useState(null);

  const { fechaCompra, proveedor, componentesComprados } = formData;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/ComprasComponentes');
      setComprasComponentes(response.data);
    } catch (error) {
      console.error('Error al obtener compras de componentes', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCompraComponente = async () => {
    try {
      if (editingCompraComponente) {
        await axios.patch(
          `http://localhost:3000/ComprasComponentes/${editingCompraComponente._id}`,
          formData
        );
      } else {
        await axios.post('http://localhost:3000/ComprasComponentes', formData);
      }
      fetchData();
      setFormData({
        fechaCompra: '',
        proveedor: '',
        componentesComprados: [],
      });
      setEditingCompraComponente(null);
    } catch (error) {
      console.error('Error al agregar/actualizar compra de componente', error);
    }
  };

  const handleDeleteCompraComponente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/ComprasComponentes/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar compra de componente', error);
    }
  };

  const handleEditCompraComponente = (id) => {
    const compraComponenteToEdit = comprasComponentes.find(
      (compraComponente) => compraComponente._id === id
    );
    if (compraComponenteToEdit) {
      setEditingCompraComponente(compraComponenteToEdit);
      setFormData({
        fechaCompra: compraComponenteToEdit.fechaCompra,
        proveedor: compraComponenteToEdit.proveedor,
        componentesComprados: compraComponenteToEdit.componentesComprados.map((componente) => ({
          nombreComponente: componente.nombreComponente,
          cantidadComprada: componente.cantidadComprada,
          precioCompra: componente.precioCompra,
        })),
      });
    }
  };

  return (
    <div>
      <h1>Compras de Componentes</h1>
      <h2>Registro</h2>
      
      <div className="card-container">
        {comprasComponentes.map((compraComponente) => (
          <Card key={compraComponente._id}>
            <Card.Content>
              <Card.Header>Proveedor: {compraComponente.proveedor}</Card.Header>
              <Card.Description>
                Fecha de Compra: {compraComponente.fechaCompra}
                <br />
                Componentes Comprados:
                <ul>
                  {compraComponente.componentesComprados.map((componente, index) => (
                    <li key={index}>
                      <strong>Nombre del Componente:</strong> {componente.nombreComponente}<br />
                      <strong>Cantidad Comprada:</strong> {componente.cantidadComprada}<br />
                      <strong>Precio de Compra:</strong> {componente.precioCompra}<br />
                    </li>
                  ))}
                </ul>
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
