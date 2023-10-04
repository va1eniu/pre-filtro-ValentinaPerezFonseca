import { Router } from "express";
import {
  obtenerComprasComponentes,
  agregarCompraComponente,
  borrarCompraComponente,
  actualizarCompraComponente,
  obtenerCompraComponente,
} from "../controllers/comprasComponentes.controller.js";

const router = Router();

router.get("/", obtenerComprasComponentes);
router.post("/", agregarCompraComponente);
router.delete("/:id", borrarCompraComponente);
router.patch("/:id", actualizarCompraComponente);
router.get("/:id", obtenerCompraComponente);

export default router;
