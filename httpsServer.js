import https from "https";
import fs from "fs";

const options = {
  pfx: fs.readFileSync("./certs/bantel202510.pfx"),
  passphrase: "B@nt312025@$$",
};

/**
 * Función para crear un servidor HTTPS con Express
 * @param {*} app instancia de express()
 * @param {*} port número de puerto (default 5007)
 */
export function createHttpsServer(app, port = 5007) {
  return https.createServer(options, app).listen(port, () => {
    console.log(`🚀 Servidor HTTPS corriendo en https://localhost:${port}`);
  });
}
