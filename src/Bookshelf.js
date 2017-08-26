import React, { Component } from 'react'

class Bookshelf extends Component {

	
	render() {

		return (
			<div className='bookshelf'>
				<h2 className="bookshelf-title">{this.props.section}</h2>
					<div className="bookshelf-books">
                    	<ol className="books-grid">

							{this.props.books.map((book, i) => (
								<div className="book" key={i}>
			                         <div className="book-top">
			                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
			                          <div className="book-title">{book.title}</div>
			                        <div className="book-authors">{book.subtitle}</div>
			                     </div>
							))}
                    	</ol>
                    </div>	
			</div>
		)
	
	}
}

export default Bookshelf




