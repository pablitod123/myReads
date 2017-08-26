import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: [],
    results: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      // console.log(JSON.stringify(books))
    })
  }

  searchBooks(query, maxResults) {
      BooksAPI.search(query, maxResults).then((results) => {
        this.setState({ results })
        // console.log(this.state.results)
      })
    }

  addBook(book, shelf) {
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/search" render={() => (
          <SearchBooks results={this.state.results} onSearch={(query) => {
            this.searchBooks(query, 20)
          }}/>
        )}/>

      <Route exact path="/" render={( {history} ) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Bookshelf books={this.state.books}/>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
