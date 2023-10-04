import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo de nombre es requerido"],
    trim: true,
  },
  correo: {
    type: String,
    required: [true, "El campo de correo es requerido"],
    trim: true,
  },
  telefono: {
    type: String,
    required: [true, "El campo de telefono es requerido"],
    trim: true,
  },
  cochesComprados: {
    type: [String],
    required: true,
  },
},
{
  timestamps: true
});

const Cliente = mongoose.model("Clientes", clienteSchema, "Clientes");

export default Cliente;

