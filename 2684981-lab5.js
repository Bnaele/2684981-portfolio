const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

app.get('/whoami', (req, res) => {
    res.status(200).json({ studentNumber: "2684981" });
});

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
});

app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newBook = {
        id: String(id),
        title: title,
        details: Array.isArray(details) ? details : []
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    const { title, details } = req.body;

    if (title !== undefined) book.title = title;
    if (details !== undefined) book.details = details;

    res.status(200).json(book);
});

app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    books.splice(index, 1);
    res.status(200).json({});
});

app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    const { id, author, genre, publicationYear } = req.body;

    if (!id || !author || !genre || publicationYear === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const detail = {
        id: String(id),
        author,
        genre,
        publicationYear
    };

    book.details.push(detail);

    res.status(201).json(book);
});

app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book or detail not found" });
    }

    const index = book.details.findIndex(d => d.id === req.params.detailId);

    if (index === -1) {
        return res.status(404).json({ error: "Book or detail not found" });
    }

    book.details.splice(index, 1);

    res.status(200).json({});
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
