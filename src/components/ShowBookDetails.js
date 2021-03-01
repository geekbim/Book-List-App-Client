import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowBookDetails(props) {

  let history = useHistory()

  const [book, setBook] = useState({})

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/books/'+props.match.params.id)
      .then(res => {
        setBook(res.data)
      })
      .catch(err => {
        console.log("Error from ShowBookDetails");
      })
  }, [props])

  const onDeleteClick = id => {
    axios
      .delete('http://localhost:8082/api/books/'+id)
      .then(res => {
        history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowBookDetails_deleteClick");
      })
  };

  const BookItem = () => {
    return (
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ book.title }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{ book.author }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>ISBN</td>
            <td>{ book.isbn }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Publisher</td>
            <td>{ book.publisher }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{ book.published_date }</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Description</td>
            <td>{ book.description }</td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <div className="ShowBookDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/" className="btn btn-outline-warning float-left">
                Show Book List
            </Link>
          </div>
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Book's Record</h1>
            <p className="lead text-center">
                View Book's Info
            </p>
            <hr /> <br />
          </div>
        </div>

        <BookItem />

        <div className="row">
          <div className="col-md-6">
            <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={ onDeleteClick.bind(book._id) }>Delete Book</button><br />
          </div>

          <div className="col-md-6">
            <Link to={`/edit-book/${book._id}`} className="btn btn-outline-info btn-lg btn-block">
                  Edit Book
            </Link>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;