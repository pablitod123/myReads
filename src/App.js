import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import AllBooksList from './AllBooksList'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  loadBooks = () => {
    BooksAPI.getAll().then((books) => 
      this.setState({ books })
    )
  }

  componentDidMount() {
    this.loadBooks()
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
          books={this.state.books}
          onShelfUpdate = {(id, shelf) => {
            this.updateShelf(id, shelf)
            history.push('/')
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
