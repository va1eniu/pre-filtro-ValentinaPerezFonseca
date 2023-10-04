import { Router } from "express";
import {
  obtenerClientes,
  agregarCliente,
  borrarCliente,
  actualizarCliente,
  obtenerCliente,
} from "../controllers/clientes.controllers.js";

const router = Router();

router.get("/", obtenerClientes);
router.post("/", agregarCliente);
router.delete("/:id", borrarCliente);
router.patch("/:id", actualizarCliente);
router.get("/:id", obtenerCliente);

export default router;

