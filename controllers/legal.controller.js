import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.resolve(__dirname, "../public/legal");

export const legalController = {
  privacidad: (req, res) =>
    res.sendFile(path.join(basePath, "privacidad.html")),
  terminos: (req, res) => res.sendFile(path.join(basePath, "terminos.html")),
  eliminar: (req, res) => res.sendFile(path.join(basePath, "eliminar.html")),
};
