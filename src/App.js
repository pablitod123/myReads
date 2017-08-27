import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import AllBooksList from './AllBooksList'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: [],
    results: []
  }

  loadBooks = () => {
    BooksAPI.getAll().then((books) => 
      this.setState({ books })
    )

  }

  componentDidMount() {
    this.loadBooks()

  }

  searchBooks(query, maxResults) {
      BooksAPI.search(query, maxResults).then((results) => {
        this.setState({ results })
      })
    }

  updateShelf(book_id, shelf) {
    BooksAPI.update(book_id, shelf).then(() => {
      (console.log("shelf updated"))
      this.loadBooks()
    })
  }

  render() {

    return (
      <div className="app">
      <Route exact path="/search" render={( {history} ) => (
          <SearchBooks 
          results={this.state.results} 
          onSearch={(query) => {
            this.searchBooks(query, 20)
          }}
          onShelfUpdate = {(id, shelf) => {
            this.updateShelf(id, shelf)
          }}/>
        )}/>

      <Route exact path="/" render={() => (
          <div>
            <AllBooksList
                    books={this.state.books}
                    onShelfUpdate = {(id, shelf) => {
                      this.updateShelf(id, shelf)
                    }}/>
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
