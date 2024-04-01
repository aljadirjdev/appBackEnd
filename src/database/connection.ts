import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const dbUrl = process.env.DB_CONNECTION;
    if (!dbUrl) {
      throw new Error("Error en la conexion!");
    }
    await mongoose.connect(dbUrl);
    console.log("Conectado con la base de dato");
  } catch (error) {
    console.log("Error ", error);
  }
};
