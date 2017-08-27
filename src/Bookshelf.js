import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {


	render() {

		return (
			<div className='bookshelf'>
				<h2 className="bookshelf-title">{this.props.section}</h2>
					<div className="bookshelf-books">
                    	<ol className="books-grid">
							{this.props.books.map((book, i) => 
								<Book 
									key={i}
									title={book.title}
									author={book.authors}
									shelf={book.shelf}
									thumbnailImage={book.imageLinks}
									onShelfUpdate={(shelf) => {
										this.props.onShelfUpdate(book.id, shelf)
									}}
									/>
								)}
                    	</ol>
                    </div>	
			</div>
		)
	
	}
}

export default Bookshelf




