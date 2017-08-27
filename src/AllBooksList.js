import React, { Component } from 'react'
import Bookshelf from './Bookshelf'

	class AllBooksList extends Component {
	
		categories = [
		{
			section_id: 'currentlyReading',
			section: 'Currently Reading'
		},
		{
			section_id: 'wantToRead',
			section: 'Want to Read'
		},
		{
			section_id: 'read',
			section: 'Read'
		}
	]

	render() {
		const books = this.props.books
		const categories = this.categories


		return (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
				<div className="list-books-content">
					{ categories.map((category, i) =>(
						<Bookshelf
							key={i}
							section={category.section}
							books={books.filter(function(book){
								return category.section_id === book.shelf
							})}
							onShelfUpdate={(id,shelf) =>{
								this.props.onShelfUpdate(id,shelf)
							}}
						/>
					))}
				</div>
			</div>
		)
	}
}

export default AllBooksList