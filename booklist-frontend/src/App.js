import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './BookList';
import BookEdit from './BookEdit';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Show the Book List on /books */}
        <Route path="/books" element={<BookList />} />
        {/* Show BookEdit for adding a new book or editing an existing one */}
        <Route path="/books/:id" element={<BookEdit />} />
        {/* Default route */}
        <Route path="*" element={<BookList />} />
      </Routes>
    </Router>
  );
}

export default App;
