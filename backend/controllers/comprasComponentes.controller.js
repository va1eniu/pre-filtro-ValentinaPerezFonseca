import CompraComponente from "../models/ComprasComponentes.js";

const obtenerComprasComponentes = async (req, res) => {
  const comprasComponentes = await CompraComponente.find();
  res.json(comprasComponentes);
};

const agregarCompraComponente = async (req, res) => {
  const nuevaCompraComponente = new CompraComponente(req.body);

  try {
    const compraComponenteGuardada = await nuevaCompraComponente.save();
    res.json(compraComponenteGuardada);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al agregar la compra de componente" });
  }
};

const borrarCompraComponente = async (req, res) => {
  try {
    await CompraComponente.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Compra de componente no encontrada" });
  }
};

const actualizarCompraComponente = async (req, res) => {
  try {
    const compraComponente = await CompraComponente.findOne({ _id: req.params.id });
    if (req.body.fechaCompra) {
      compraComponente.fechaCompra = req.body.fechaCompra;
    }
    if (req.body.proveedor) {
      compraComponente.proveedor = req.body.proveedor;
    }
    if (req.body.componentesComprados) {
      compraComponente.componentesComprados = req.body.componentesComprados;
    }

    await compraComponente.save();
    res.json(compraComponente);
  } catch (error) {
    res.status(404).json({ error: "Compra de componente no encontrada" });
  }
};

const obtenerCompraComponente = async (req, res) => {
  const compraComponente = await CompraComponente.findOne({ _id: req.params.id });
  if (!compraComponente) {
    return res.status(404).json({ error: "Compra de componente no encontrada" });
  }
  res.json(compraComponente);
};

export {
  obtenerComprasComponentes,
  agregarCompraComponente,
  borrarCompraComponente,
  actualizarCompraComponente,
  obtenerCompraComponente,
};
