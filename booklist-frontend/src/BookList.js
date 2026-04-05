import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonGroup, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:8000/api/books")
    .then(response => response.json())
    .then(data => {
      setBooks(data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching books:", error);
      setLoading(false);
    });
}, []);

  const removeBook = async (id) => {
    await fetch(`http://localhost:8000/api/book/${id}`, { method: 'DELETE' });
    setBooks(books.filter(book => book._id !== id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const bookRows = books.map(book => (
    <tr key={book._id}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="info" tag={Link} to={`/books/${book._id}`}>
            Edit
          </Button>
          <Button size="sm" color="warning" onClick={() => removeBook(book._id)}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <Container>
      <div className="my-4 text-end">
        <Button color="success" tag={Link} to="/books/new">
          Add Book
        </Button>
      </div>
      <h3>Book List</h3>
      <Table className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{bookRows}</tbody>
      </Table>
    </Container>
  );
}

export default BookList;