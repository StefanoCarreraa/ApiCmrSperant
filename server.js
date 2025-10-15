import app from "./app.js";
import { config } from "./config/config.js";
import { createHttpsServer } from './httpsServer.js';

// // Render te da su propio puerto dinámico
// const PORT = config.port || 5007;

// // Escucha en todas las interfaces, no solo localhost
// app.listen(PORT, () => {
//   console.log(`🚀 Servidor HTTP corriendo en puerto ${PORT}`);
// });

createHttpsServer(app, config.port);
