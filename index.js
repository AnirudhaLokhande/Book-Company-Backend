// MAIN BACKEND FILE
//npx nodemon index.js --  for mac
const db = require("./database");
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");


const express = require("express");
const app = express();
app.use(express.json());

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = 'mongodb+srv://Anirudha_Lokhande:fxD0WYW69SUhJgvI@cluster0.n89ib.mongodb.net/book-company?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED")); 



// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://Anirudha_Lokhande:fxD0WYW69SUhJgvI@cluster0.n89ib.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     console.log(client); 
//     console.log(client.db("book-company").collection("books") ); 
//     const bcollection = client.db("book-company").collection("books");
//     console.log(bcollection.s.db.Db.s );
//   // perform actions on the collection object
//     client.close();
// });



// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();
//     console.log("THE DATABASES ARE:");
//     databasesList.databases.forEach(db=>console.log(db.name));
// } 



// async function main() {
//     const uri = "mongodb+srv://Anirudha_Lokhande:fxD0WYW69SUhJgvI@cluster0.n89ib.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try{
//         await client.connect();
//         const result = await client.db("book-company").collection("books").findOne({ISBN: "12345ONE"});
//         console.log(result);
//         // await listDatabases(client);
//     }
//     catch(err) {
//         console.log(err)
//     }
//     finally {
//         await client.close();
//     }
// }
// main();



// --------- GET API ---------

// http://localhost:3000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company`});
});

// http://localhost:3000/books
app.get("/books", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

// http://localhost:3000/book-isbn/12345ONE
app.get("/book-isbn/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificBook = await BookModel.findOne({ISBN: isbn});
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook);
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
    // // console.log(req.params);
    const {category} = req.params;
    // // console.log(isbn);
    const getSpecificBooks = await BookModel.find({category:category});
    // // console.log(getSpecificBook);
    // // console.log(getSpecificBook.length);
    if(getSpecificBooks.length===0) {
        return res.json({"error": `No Books found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});

// http://localhost:3000/authors
app.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// http://localhost:3000/author-id/1
app.get("/author-id/:id", async (req, res) => {
    // console.log(req.params);
    const {id} = req.params;
    // console.log(id);
    const getSpecificAuthor = await AuthorModel.findOne({id: id});
    // console.log(getSpecificAuthor);
    if(getSpecificAuthor===null) {
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor);
});

// http://localhost:3000/author-isbn/12345Two
app.get("/author-isbn/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificAuthors = await AuthorModel.find({books:isbn});
    // console.log(getSpecificAuthors);
    // console.log(getSpecificAuthors.length);
    if(getSpecificAuthors.length===0) {
        return res.json({"error": `No Authors found for the book of ${isbn}`});
    }
    return res.json(getSpecificAuthors);
 });

// http://localhost:3000/publications
app.get("/publications", async (req, res) => {
    const getAllPublications = await PublicationModel.find(); 
    return res.json(getAllPublications);
});

// http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", (req, res) => {

});

// ---------   POST API ---------

// http://localhost:3000/book
app.post("/book", async (req, res) => {
    // console.log(req.body);
    const addNewBook = await BookModel.create(req.body);
    return res.json( {bookAdded: addNewBook, message: "Book was added !!!"} );
}); 

// http://localhost:3000/author
app.post("/author", async (req, res) => {
    // console.log(req.body);
    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json( {authorAdded: addNewAuthor, message: "Author was added !!!"} );
});


// http://localhost:3000/publication
app.post("/publication", async (req, res) => {
    // console.log(req.body);
    const addNewPublication = await PublicationModel.create(req.body);
    return res.json( {publicationAdded: addNewPublication, message: "Publication was added !!!"} );
});

// --------- PUT API ---------

// http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", async (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, req.body, {new: true});
    return res.json( {bookUpdated: updateBook, message: "Book was updated !!!"} );
});

// http://localhost:3000/author-update/1
app.put("/author-update/:id", (req, res) => {
});

// http://localhost:3000/publication-update/1
app.put("/publication-update/:id", (req, res) => {
});

// --------- DELETE API ---------

// http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ISBN: isbn});
    return res.json( {bookDeleted: deleteBook, message: "Book was Deleted !!!"} );
});

// http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", (req, res) => {
    // console.log(req.params);
    const {isbn, id}= req.params;
    let getSpecificBook= await BookModel.findOne({ISBN: isbn}); 
        if(getSpecificBook===null) {
            return res.json ({"error": "No Book found for the ISBN of ${isbn)"});
        }
        else {
            getSpecificBook.authors.remove(id);
            const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, getSpecificBook, {new: true});
            return res.json( {bookUpdated: updateBook, message: "Author was Deleted from the Book !!!"});
        }
});

// http://localhost:3000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn", (req, res) => {
});

// http://localhost:3000/author-delete/12345ONE
app.delete("/author-delete/:id", (req, res) => {
});

// http://localhost:3000/publication-delete/12345ONE
app.delete("/publication-delete/:id", (req, res) => {
});

app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});