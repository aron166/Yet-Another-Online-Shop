import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import products from './links.json' with  {type : 'json'};
import { readFile, readFileSync } from 'fs';


console.log(products)
const app = express();
app.use(express.json());
const PORT = 3000;
app.use('/static', express.static('../client'));
app.use('/img', express.static('./img'));
const cart = [];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'client', 'index.html'))
})

app.get('/api/products', (req, res) => {
    const currentData = readFileSync('./links.json', 'utf-8');
    res.json(currentData);
})

app.get('/api/product/:id', (req, res) => {
    const id = req.params.id;
    const result = products.find((p) => p.id === id);

    if (!result) {
        return res.status(404).send('Product with this id not found');
    }

    res.json(result);
});

app.post('/api/cart', (req, res) => {
    const addedProduct = req.body;
    const productFromList = products.find((p) => {
        return p.id === addedProduct.id
    });
    const quantity = parseInt(addedProduct.quantity);
    if (quantity > 0 && productFromList){
        for (let i = 0; i < quantity; i++){
            cart.push(productFromList)
        }
        res.status(201).send(cart)
    } else {
        res.status(400).send('product not found or/and quantity cannot be less than zero')
    }
})
app.get('/api/checkout',(req, res) => {
    res.send(cart.json());
})





app.listen(PORT, () => {
    console.log(`Localhost is running at: http://localhost:${PORT}`);
});
