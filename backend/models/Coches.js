import mongoose from "mongoose";

const cocheSchema =  new mongoose.Schema({
  modelo: {
    type: String,
    required: [true, "El campo de modelo es requerido"],
    trim: true,
  },
  año: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  motor: {
    type: {
      tipo: String,
      cilindrada: Number,
      potencia: Number,
    },
    required: true,
  },
  coloresDisponibles: {
    type: [String],
    required: true,
  },
},
{
  timestamps: true
});

const Coche = mongoose.model("Coches", cocheSchema, "Coches");

export default Coche;
