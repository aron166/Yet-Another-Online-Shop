import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
app.use(express.json());
const PORT = 3000;
const __dirname = fileURLToPath(import.meta.url)



app.listen(PORT, () => {

})