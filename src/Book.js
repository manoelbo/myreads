import React, { Component } from 'react';

class Book extends Component {
    render() {
        const {
            book,
            onChangetShelf
        } = this.props

        let backgroundImage = '';
        if (book.imageLinks) {
             backgroundImage = 'url('+ book.imageLinks.thumbnail + ')';
        }

        return(
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: backgroundImage }}></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={(e) => onChangetShelf(book, e.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{ book.title }</div>
              <div className="book-authors">{ book.authors && book.authors.map((author) => {
                  return(<span key={author}>{author}<br/></span>)
              }) }</div>
            </div>
        );
    }
}

export default Book;
