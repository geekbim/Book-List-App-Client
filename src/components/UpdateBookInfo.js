import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateBookInfo(props) {

  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [publisher, setPublisher] = useState('')

  useEffect(() => {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/books/'+props.match.params.id)
      .then(res => {
        setTitle(res.data.title)
        setIsbn(res.data.isbn)
        setAuthor(res.data.author)
        setDescription(res.data.description)
        setPublishedDate(res.data.publishedDate)
        setPublisher(res.data.publisher)
      })
      .catch(err => {
        console.log("Error from UpdateBookInfo");
      })
  }, [props])

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      title: title,
      isbn: isbn,
      author: author,
      description: description,
      published_date: publishedDate,
      publisher: publisher
    };

    axios
      .put('http://localhost:8082/api/books/'+props.match.params.id, data)
      .then(res => {
        props.history.push('/show-book/'+props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateBookInfo!");
      })
  }

  return (
    <div className="UpdateBookInfo">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Show BooK List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Book</h1>
            <p className="lead text-center">
                Update Book's Info
            </p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
        <form noValidate>
          <div className='form-group'>
            <label htmlFor="title">Title</label>
            <input
              type='text'
              placeholder='Title of the Book'
              name='title'
              className='form-control'
              value={ title }
              onChange={ e => setTitle(e.target.value) }
            />
          </div>
          <br />

          <div className='form-group'>
          <label htmlFor="isbn">ISBN</label>
            <input
              type='text'
              placeholder='ISBN'
              name='isbn'
              className='form-control'
              value={ isbn }
              onChange={ e => setIsbn(e.target.value) }
            />
          </div>

          <div className='form-group'>
          <label htmlFor="author">Author</label>
            <input
              type='text'
              placeholder='Author'
              name='author'
              className='form-control'
              value={author}
              onChange={ e => setAuthor(e.target.value) }
            />
          </div>

          <div className='form-group'>
          <label htmlFor="description">Description</label>
            <input
              type='text'
              placeholder='Describe this book'
              name='description'
              className='form-control'
              value={description}
              onChange={ e => setDescription(e.target.value) }
            />
          </div>

          <div className='form-group'>
          <label htmlFor="published_date">Published Date</label>
            <input
              type='date'
              placeholder='published_date'
              name='published_date'
              className='form-control'
              value={publishedDate}
              onChange={ e => setPublishedDate(e.target.value) }
            />
          </div>
          <div className='form-group'>
          <label htmlFor="publisher">Publisher</label>
            <input
              type='text'
              placeholder='Publisher of this Book'
              name='publisher'
              className='form-control'
              value={publisher}
              onChange={ e => setPublisher(e.target.value) }
            />
          </div>

          <button className="btn btn-outline-info btn-lg btn-block" onClick={ onSubmit }>Update Book</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default UpdateBookInfo;