import mongoose from "mongoose";

const componenteSchema =  new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo de nombre es requerido"],
    trim: true,
  },
  tipo: {
    type: String,
    required: [true, "El campo de tipo es requerido"],
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
},
{
  timestamps: true
});

const Componente = mongoose.model("Componentes", componenteSchema, "Componentes");

export default Componente;
