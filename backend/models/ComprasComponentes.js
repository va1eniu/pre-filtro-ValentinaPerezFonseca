import mongoose from "mongoose";

const compraComponenteSchema = new mongoose.Schema({
  fechaCompra: {
    type: Date,
    required: [true, "La fecha de compra es requerida"],
  },
  proveedor: {
    type: String,
    required: [true, "El proveedor es requerido"],
    trim: true,
  },
  componentesComprados: [
    {
      nombreComponente: {
        type: String,
        required: [true, "El nombre del componente es requerido"],
        trim: true,
      },
      cantidadComprada: {
        type: Number,
        required: [true, "La cantidad comprada es requerida"],
      },
      precioCompra: {
        type: Number,
        required: [true, "El precio de compra es requerido"],
      },
    },
  ],
},
{
  timestamps: true,
});

const ComprasComponentes = mongoose.model("ComprasComponentes", compraComponenteSchema, "ComprasComponentes");

export default ComprasComponentes;
