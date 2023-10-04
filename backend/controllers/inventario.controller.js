import Inventario from "../models/Inventario.js";

const obtenerInventario = async (req, res) => {
  const inventario = await Inventario.find();
  res.json(inventario);
};

const agregarInventario = async (req, res) => {
  const nuevoInventario = new Inventario(req.body);

  try {
    const inventarioGuardado = await nuevoInventario.save();
    res.json(inventarioGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar el inventario" });
  }
};

const borrarInventario = async (req, res) => {
  try {
    await Inventario.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Inventario no encontrado" });
  }
};

const actualizarInventario = async (req, res) => {
  try {
    const inventario = await Inventario.findOne({ _id: req.params.id });
    if (req.body.coche) {
      inventario.coche = req.body.coche;
    }
    if (req.body.cantidad) {
      inventario.cantidad = req.body.cantidad;
    }

    await inventario.save();
    res.json(inventario);
  } catch (error) {
    res.status(404).json({ error: "Inventario no encontrado" });
  }
};

const obtenerItemInventario = async (req, res) => {
  const inventario = await Inventario.findOne({ _id: req.params.id });
  if (!inventario) {
    return res.status(404).json({ error: "Inventario no encontrado" });
  }
  res.json(inventario);
};

export {
  obtenerInventario,
  agregarInventario,
  borrarInventario,
  actualizarInventario,
  obtenerItemInventario,
};
