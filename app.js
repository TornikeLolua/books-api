const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/v1/authors', require('./routes/authorsRouter'));
app.use('/api/v1/books', require('./routes/booksRouter'));
app.use('/api/v1/reviews', require('./routes/reviewsRouter'));

app.listen(3000, () => console.log('Server running at http://localhost:3000'));