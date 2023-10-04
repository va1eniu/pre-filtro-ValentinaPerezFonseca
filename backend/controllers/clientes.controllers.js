import Cliente from "../models/Clientes.js";

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

// Agregar un nuevo cliente
const agregarCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el cliente" });
  }
};

// Borrar un cliente por ID
const borrarCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndRemove(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al borrar el cliente" });
  }
};

// Actualizar un cliente por ID
const actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

// Obtener un cliente por ID
const obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
};

export {
  obtenerClientes,
  agregarCliente,
  borrarCliente,
  actualizarCliente,
  obtenerCliente,
};
