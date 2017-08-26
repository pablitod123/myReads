import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, {hash: true})
		this.props.onSearch(values.query, 20)
		console.log(this.props.results)
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
	              	{this.props.results.map((result, i) => (
								<div className="book" key={i}>
			                         <div className="book-top">
			                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${result.imageLinks.thumbnail})` }}></div>
				                            <div className="book-shelf-changer">
				                              <select>
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