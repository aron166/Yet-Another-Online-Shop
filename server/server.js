import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import products from './links.json' with  {type : 'json'};
import { readFile, readFileSync } from 'fs';

console.log(products)
const app = express();
app.use(express.json());
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/products', (req, res) => {
    const currentData = readFileSync('./links.json');
    res.json(currentData);
})

app.get('/api/product/:id', (req, res) => {
    const id = req.params.id;
    if(id != '1' || id != '2' || id != '3'){
        res.status(404).send('Product with this id not found');
    } else{
       const result = products[products.indexOf((p) => {p.id === id})];
       res.send(result.json())
    }
} )




app.listen(PORT, () => {
    
});
