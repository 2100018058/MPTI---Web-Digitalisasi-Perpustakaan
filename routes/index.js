const bookRoutes = require("express").Router();
// const upload = require('./uploads');
const {
  getAllBooks,
  addBooks,
  getBookById,
  updateBook,
  deleteBook,
  reqError,
  searchBook,
  downloadFile,
  downloadImage,
} = require("../controller/booksController");
const {
  getAllCategories,
  addCategory,
  searchCategories,
  updateCategories,
  deleteCategories,
} = require("../controller/categoriesController");
const { verifyToken, verifyRole2 } = require("../middleware/auth");

// Import the configured multer instance
const upload = require("../middleware/multer");

//tambahan
// const uploadd = require("../middleware/multer");

//bisa
// const multer = require("multer");
// const { GridFsStorage } = require('multer-gridfs-storage'); //tambahan

// // //coba
// // const upload = require("../middleware/multer");

// // Konfigurasi storage menggunakan GridFsStorage
// const storage = new GridFsStorage({
//   url: "mongodb+srv://pinastiaul:vmjHXEGrffgQbqgH@aurpy.pzccrez.mongodb.net/?retryWrites=true&w=majority&appName=aurpy", // Ganti dengan URL MongoDB Anda
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     return {
//       filename: file.originalname
//     };
//   }  
// });
// const upload = multer({ storage: storage });

bookRoutes.get("/books", getAllBooks);
bookRoutes.get("/books/id/:id", getBookById);
// bookRoutes.post("/books/tambah",   upload.single('pdfUrl'), addBooks);
// bookRoutes.put("/books/ubah/:id",   upload.single('pdfUrl'), updateBook);

//coba baru
bookRoutes.post("/books/tambah", upload.fields([{ name: 'pdfUrl' }, { name: 'imageUrl' }]), addBooks);
bookRoutes.put("/books/ubah/:id", upload.fields([{ name: 'pdfUrl' }, { name: 'imageUrl' }]), updateBook);

bookRoutes.delete("/books/hapus/:id", deleteBook);
bookRoutes.get("/books/search", searchBook);
bookRoutes.get("/books/view/:id", downloadFile); 
// bookRoutes.get("/books/view/:id", downloadFile);
bookRoutes.get("/books/image/:id", downloadImage);

// Kategori routes
bookRoutes.get("/categories", getAllCategories);
bookRoutes.post("/categories/tambah", addCategory);
bookRoutes.get("/categories/search", searchCategories);
bookRoutes.put("/categories/ubah/:id", updateCategories); // Add this route for updating category
bookRoutes.delete("/categories/hapus/:id", deleteCategories);

// bookRoutes.get("/books" getAllBooks);nod
// bookRoutes.get("/books/id/:id", getBookById);
// bookRoutes.post("/books/tambah",  addBooks);
// bookRoutes.put("/books/ubah/:id",  updateBook);
// bookRoutes.delete("/books/hapus/:id", deleteBook);
// bookRoutes.get("/books/search", searchBook);

// bookRoutes.get("/books/:id-:nama", (req, res) => {
//   res.send(req.params);
//   console.log(req.params);
// });
// bookRoutes.get("/books/:id.:nama", (req, res) => {
//   res.send(req.params);
//   console.log(req.params);
// });
bookRoutes.use("/", reqError);

module.exports = bookRoutes;