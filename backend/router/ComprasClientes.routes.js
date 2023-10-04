import { Router } from "express";
import {
  obtenerComprasClientes,
  agregarCompraCliente,
  borrarCompraCliente,
  actualizarCompraCliente,
  obtenerCompraCliente,
} from "../controllers/ComprasClientes.controllers.js";

const router = Router();

router.get("/", obtenerComprasClientes);
router.post("/", agregarCompraCliente);
router.delete("/:id", borrarCompraCliente);
router.patch("/:id", actualizarCompraCliente);
router.get("/:id", obtenerCompraCliente);

export default router;
