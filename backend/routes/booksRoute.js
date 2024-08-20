import express from "express";
import { Books } from "../models/bookModel.js";

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({ 
                message: 'Send all required fields: title, author, publishYear', 
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            summary: request.body.summary || '',  
            review: request.body.review || ''    
        };

        const book = await Books.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get all Books
router.get('/', async (request, response) => {
    try {
        const books = await Books.find();

        return response.status(200).send({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for get One Book by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Books.findById(id);

        if (!book) {
            return response.status(404).send({ message: 'Book not found' });
        }

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a Book

router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({ 
                message: 'Send all required fields: title, author, publishYear', 
            });
        }

        const { id } = request.params;

        const updatedBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            summary: request.body.summary,  
            review: request.body.review     
        };

        const result = await Books.findByIdAndUpdate(id, updatedBook, { new: true });

        if (!result) {
            return response.status(404).send({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully', data: result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Delete a Book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Books.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;