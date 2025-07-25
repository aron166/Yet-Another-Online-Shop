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
const cart = [];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'client', 'index.html'))
})

app.get('/api/products', (req, res) => {
    const currentData = readFileSync('./links.json', 'utf-8');
    res.json(JSON.parse(currentData));
})

app.get('/api/product/:id', (req, res) => {
    const id = req.params.id;
    const result = products.find((p) => p.id === id);

    if (!result) {
        return res.status(404).send('Product with this id not found');
    }

    res.json(result);
});

app.get('/static/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'editor.html'))
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
        res.status(201).send(JSON.stringify(cart))
    } else {
        res.status(400).send('product not found or/and quantity cannot be less than zero')
    }
})
app.get('/api/checkout',(req, res) => {
    res.send(cart);
})
app.delete('/api/cart/del/:id', (req, res) => {
    const productToDel = cart.find((p) => {
        return p.id === req.params.id})
        if(!productToDel){
            res.status(404).send("Product with this id not found");
        }
        const index = cart.indexOf(productToDel)
        cart.splice(index, 1);

})

app.post('/edit', (req, res) => {
    try {
        const { title, dimensions, technique, price, img } = req.body;
    
        const filePath = path.join(__dirname, 'links.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(rawData);
    
        const newProduct = {
          id: String(data.length + 1),
          title,
          dimensions,
          img,
          technique,
          price
        };
    
        data.push(newProduct);
        readFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    
        res.json(newProduct);
    
      } catch (err) {
        console.error('💥 Server error in /edit:', err);
        res.status(500).send('Internal server error');
      }
    });



app.listen(PORT, () => {
    console.log(`Localhost is running at: http://localhost:${PORT}`);
});
