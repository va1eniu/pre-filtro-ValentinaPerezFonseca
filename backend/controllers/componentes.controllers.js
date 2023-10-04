import Componente from "../models/Componentes.js";

const obtenerComponentes = async (req, res) => {
  const componentes = await Componente.find();
  res.json(componentes);
};

const agregarComponente = async (req, res) => {
  const nuevoComponente = new Componente(req.body);

  try {
    const componenteGuardado = await nuevoComponente.save();
    res.json(componenteGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar el componente" });
  }
};

const borrarComponente = async (req, res) => {
  try {
    await Componente.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Componente no encontrado" });
  }
};

const actualizarComponente = async (req, res) => {
  try {
    const componente = await Componente.findOne({ _id: req.params.id });
    if (req.body.nombre) {
      componente.nombre = req.body.nombre;
    }
    if (req.body.tipo) {
      componente.tipo = req.body.tipo;
    }
    if (req.body.descripcion) {
      componente.descripcion = req.body.descripcion;
    }
    if (req.body.precio) {
      componente.precio = req.body.precio;
    }

    await componente.save();
    res.json(componente);
  } catch (error) {
    res.status(404).json({ error: "Componente no encontrado" });
  }
};

const obtenerComponente = async (req, res) => {
  const componente = await Componente.findOne({ _id: req.params.id });
  if (!componente) {
    return res.status(404).json({ error: "Componente no encontrado" });
  }
  res.json(componente);
};

export {
  obtenerComponentes,
  agregarComponente,
  borrarComponente,
  actualizarComponente,
  obtenerComponente,
};
