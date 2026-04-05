import React, { useEffect, useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';

function BookEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  // Fetch existing book if we're editing
  useEffect(() => {
    if (id !== 'new') {
      fetch(`/api/books/${id}`)
        .then(response => response.json())
        .then(data => setBook(data))
        .catch(error => console.error('Error fetching book:', error));
    }
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = (id === 'new') ? 'POST' : 'PUT';
    const url = (id === 'new')
      ? '/api/books'
      : `/api/books/${id}`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });

    navigate('/books');
  };

  const titleText = (id === 'new') ? 'Add Book' : 'Edit Book';

  return (
    <Container>
      <h2 className="my-4">{titleText}</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input
            type="text"
            name="author"
            id="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button color="info" type="submit">Save</Button>{' '}
        <Button color="secondary" tag={Link} to="/books">Cancel</Button>
      </Form>
    </Container>
  );
}

export default BookEdit;
