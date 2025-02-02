// filepath: /c:/Users/alpha/Website/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

let reviews = [];

app.use(bodyParser.json());
app.use(cors());

app.post('/reviews', (req, res) => {
    const review = req.body;
    review.id = Date.now(); // Assign a unique ID to each review
    reviews.push(review);
    res.status(201).send(review);
});

app.get('/reviews', (req, res) => {
    res.send(reviews);
});

app.delete('/reviews/:id', (req, res) => {
    const reviewId = parseInt(req.params.id, 10);
    reviews = reviews.filter(review => review.id !== reviewId);
    res.status(204).send(); // No content
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});