import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsEye } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";

const BooksTable = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [bookList, setBookList] = useState(books);

  const handleOpenModal = (book) => {
    setCurrentBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentBook(null);
    setShowModal(false);
  };

  const handleBookUpdate = (updatedBook) => {
    setBookList((prevBooks) =>
      prevBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
    setShowModal(false); // Close the modal after updating
  };

  return (
    <>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">No</th>
            <th className="border border-slate-600 rounded-md">Title</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Author
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Publish Year
            </th>
            <th className="border border-slate-600 rounded-md">Operations</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, index) => (
            <tr key={book._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {book.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.author}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {book.publishYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <BsEye
                    className="text-2xl text-blue-800 cursor-pointer"
                    onClick={() => handleOpenModal(book)}
                  />
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && currentBook && (
        <BookModal
          book={currentBook}
          onClose={handleCloseModal}
          onBookUpdate={handleBookUpdate}
        />
      )}
    </>
  );
};

export default BooksTable;
