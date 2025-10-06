import app from "./app.js";
import { config } from "./config/config.js";
import listEndpoints from "express-list-endpoints";

// Render te da su propio puerto dinámico
const PORT = process.env.PORT || config.port || 5007;

console.log("📜 Rutas disponibles en la app:");
console.log(listEndpoints(app));

// Escucha en todas las interfaces, no solo localhost
app.listen(PORT, () => {
  console.log(`🚀 Servidor HTTP corriendo en puerto ${PORT}`);
});
