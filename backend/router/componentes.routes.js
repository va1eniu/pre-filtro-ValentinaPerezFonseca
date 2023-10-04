import { Router } from "express";
import {
  obtenerComponentes,
  agregarComponente,
  borrarComponente,
  actualizarComponente,
  obtenerComponente,
} from "../controllers/componentes.controllers.js";

const router = Router();

router.get("/", obtenerComponentes);
router.post("/", agregarComponente);
router.delete("/:id", borrarComponente);
router.patch("/:id", actualizarComponente);
router.get("/:id", obtenerComponente);

export default router;
