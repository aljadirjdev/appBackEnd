import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import customersRoute from "./routes/customers.route";
import employeesRoute from "./routes/employees.route";
import productsRoute from "./routes/products.route";
import ordersRoute from "./routes/orders.route";
import authRoute from "./routes/auth.route";

import cors from "cors"; // Import the 'cors' package

// import express, { Application } from "express";
class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    customer: "/api/v1/customers",
    employee: "/api/v1/employees",
    product: "/api/v1/products",
    order: "/api/v1/orders",
    auth: "/api/v1/auth",
  };
  // Constructor
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.middleware();

    // LLamada a la conexion de base de dato
    dbConnection();
    // LLamada a las rutas
    this.route();
  }

  miPrimeraApi() {
    this.app.get("/", (req: Request, resp: Response) =>
      resp.status(200).json({ msg: "Informacion" })
    );
  }
  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.miPrimeraApi();
    console.log("mi primera app");
  }

  route(): void {
    this.app.use(this.apiPaths.customer, customersRoute);
    this.app.use(this.apiPaths.employee, employeesRoute);
    this.app.use(this.apiPaths.product, productsRoute);
    this.app.use(this.apiPaths.order, ordersRoute);
    this.app.use(this.apiPaths.auth, authRoute);
  }

  // Function
  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo", this.port);
    });
  }
}
export default Server;
