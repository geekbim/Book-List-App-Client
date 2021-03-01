import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


function CreateBook() {

  let history = useHistory()

  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [publishedDate, setPublishedDate] = useState('')
  const [publisher, setPublisher] = useState('')

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
      .post('http://localhost:8082/api/books', data)
      .then(res => {
        setTitle('')
        setIsbn('')
        setAuthor('')
        setDescription('')
        setPublishedDate('')
        setPublisher('')
        history.push("/")
      })
      .catch(err => {
        console.log("Error in CreateBook!");
      })
  };

  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Show BooK List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Book</h1>
            <p className="lead text-center">
                Create new book
            </p>

            <form noValidate>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Title of the Book'
                  name='title'
                  className='form-control'
                  value={title}
                  onChange={ e => setTitle(e.target.value) }
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='ISBN'
                  name='isbn'
                  className='form-control'
                  value={isbn}
                  onChange={ e => setIsbn(e.target.value) }
                />
              </div>

              <div className='form-group'>
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
                <input
                  type='text'
                  placeholder='Publisher of this Book'
                  name='publisher'
                  className='form-control'
                  value={publisher}
                  onChange={ e => setPublisher(e.target.value) }
                />
              </div>

              <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
                  onClick={ onSubmit }
              />
            </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBook;