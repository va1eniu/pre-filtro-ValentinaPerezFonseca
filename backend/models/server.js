import express from "express";
import cors from "cors";
import conectarDB from "../database/config.js"; 
import RouterClient from "../router/Clientes.routes.js";
import RouterCoches from "../router/coches.routes.js";
import RouterCompo from "../router/componentes.routes.js";
import routerCompoCompras from "../router/comprasComponentes.routes.js";
import routerInvent from "../router/inventario.routes.js";
/* import routerComprasClient from "../router/ComprasClientes.routes.js"; */


class Server {
  constructor() {
    this.app = express();
    this.connect();
    this.port = process.env.PORT || 3000; 
    this.middlewares();
    this.paths = {
      clientPath: "/clientes",
      cochesPath: "/coches",
      compoPath: "/componentes",
      compoComprasPath: "/ComprasComponentes",
      inventPath: "/inventario",
      /* comprasClientPath: "/ComprasClientes" */
    };
    this.routes();
    
  }

  async connect() {
    await conectarDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.clientPath, RouterClient);
    this.app.use(this.paths.cochesPath, RouterCoches);
    this.app.use(this.paths.compoPath, RouterCompo);
    this.app.use(this.paths.compoComprasPath, routerCompoCompras);
    this.app.use(this.paths.inventPath, routerInvent);
   /*  this.app.use(this.paths.comprasClientPath, routerComprasClient); */
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
