import Coche from "../models/Coches.js";

const obtenerCoches = async (req, res) => {
  const coches = await Coche.find();
  res.json(coches);
};

const agregarCoche = async (req, res) => {
  const nuevoCoche = new Coche(req.body);

  try {
    const cocheGuardado = await nuevoCoche.save();
    res.json(cocheGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar el coche" });
  }
};

const borrarCoche = async (req, res) => {
  try {
    await Coche.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Coche no encontrado" });
  }
};

const actualizarCoche = async (req, res) => {
  try {
    const coche = await Coche.findOne({ _id: req.params.id });
    if (req.body.modelo) {
      coche.modelo = req.body.modelo;
    }
    if (req.body.año) {
      coche.año = req.body.año;
    }
    if (req.body.precio) {
      coche.precio = req.body.precio;
    }
    if (req.body.motor) {
      coche.motor = req.body.motor;
    }
    if (req.body.coloresDisponibles) {
      coche.coloresDisponibles = req.body.coloresDisponibles;
    }

    await coche.save();
    res.json(coche);
  } catch (error) {
    res.status(404).json({ error: "Coche no encontrado" });
  }
};

const obtenerCoche = async (req, res) => {
  const coche = await Coche.findOne({ _id: req.params.id });
  if (!coche) {
    return res.status(404).json({ error: "Coche no encontrado" });
  }
  res.json(coche);
};

export {
  obtenerCoches,
  agregarCoche,
  borrarCoche,
  actualizarCoche,
  obtenerCoche,
};
