import mongoose from "mongoose";

const inventarioSchema =  new mongoose.Schema({
  coche: {
    type: String,
    required: [true, "El campo de coche es requerido"],
    trim: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
},
{
  timestamps: true
});

const Inventario = mongoose.model("Inventario", inventarioSchema, "Inventario");

export default Inventario;
