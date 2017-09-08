import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

	state = {
    results: []
  }
  
    checkBookState = (books, searchResults) => {
  	searchResults.map((searchResult)=>{
  		books.forEach((book)=>{
  				if(book.id === searchResult.id){
  					searchResult.shelf = book.shelf
  					return
  				}
  			})
  		return searchResult
  		})
  	}

  	
   searchBooks(query, maxResults) {
      BooksAPI.search(query, maxResults).then((results) => {
      	console.log(this.checkBookState(this.props.books,this.props.books))
        // results = this.checkBookState(____,this.props.books)
        this.setState({ results })
      })
    }
	
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, {hash: true})
		this.searchBooks(values.query, 20)
	}


	render() {
		return (	
			<div className="search-books">
	            <div className="search-books-bar">
	              <Link className="close-search" to="/">Close</Link>
	              <div className="search-books-input-wrapper">
	              	<form onSubmit={this.handleSubmit}>
	                	<input type="text" name="query" placeholder="Search by title or author"/>
	                </form>
	              </div>
	            </div>
	            <div className="search-books-results">
	              <ol className="books-grid">
	              	{this.state.results.map((result, i) => (
								<div className="book" key={i}>
			                         <div className="book-top">
			                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${result.imageLinks.thumbnail})` }}></div>
				                            <div className="book-shelf-changer">
				                              <select  onChange={(e)=>{this.props.onShelfUpdate(result,e.target.value);}}>
				                                <option value="none" disabled>Move to...</option>
				                                <option value="currentlyReading">Currently Reading</option>
				                                <option value="wantToRead">Want to Read</option>
				                                <option value="read">Read</option>
				                                <option value="none">None</option>
				                              </select>
				                            </div>
				                          </div>
			                          <div className="book-title">{result.title}</div>
			                        <div className="book-authors">{result.subtitle}</div>
			                     </div>
							))}
	              </ol>
	            </div>
	         </div>
		)
	}
}

export default SearchBooks