import { Router } from "express";
import {
  obtenerCoches,
  agregarCoche,
  borrarCoche,
  actualizarCoche,
  obtenerCoche,
} from "../controllers/coches.controllers.js";

const router = Router();

router.get("/", obtenerCoches);
router.post("/", agregarCoche);
router.delete("/:id", borrarCoche);
router.patch("/:id", actualizarCoche);
router.get("/:id", obtenerCoche);

export default router;
