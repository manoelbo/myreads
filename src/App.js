import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book';

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    searchResult: []
  }


  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books });
      });
  }

  clearSearchResult() {
      this.setState({
          searchResult: []
      })
  }
  searchOnChange = (query) => {
      this.setState({
          query: query
      })

      if (query.length > 0) {
          BooksAPI.search(query).then((searchResult) => {
              if (!searchResult.error) {
                  this.setState({
                      searchResult
                  })
              } else {
                  this.clearSearchResult()
              }
          });
      } else {
          this.clearSearchResult()
      }

  }
  updateBoookShelf(book, shelf) {
      BooksAPI.update(book, shelf).then(() => {
          BooksAPI.getAll().then((books) => {
              this.setState({ books });
          });
      });

  }

  render() {
    return (
      <div className="app">
          <Route path='/search' render={() => (
              <div className="search-books">
                <div className="search-books-bar">
                  <Link className="close-search" to='/'>Close</Link>
                  <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={event => this.searchOnChange(event.target.value)}
                    />

                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                      {
                          this.state.searchResult.map((book) =>
                          <li key={book.id}>
                            <Book
                                book={book}
                                onChangetShelf={this.updateBoookShelf.bind(this)}
                            />
                          </li>
                          )
                      }
                  </ol>
                </div>
              </div>
          )}/>

          <Route exact path='/' render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                            {
                                this.state.books.filter((book) => book.shelf === 'currentlyReading' ).map((book) =>
                                    <li key={book.title}>
                                      <Book
                                          book={book}
                                          onChangetShelf={this.updateBoookShelf.bind(this)}

                                      />
                                    </li>
                                )
                            }
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                            {
                                this.state.books.filter((book) => book.shelf === 'wantToRead' ).map((book) =>
                                    <li key={book.title}>
                                        <Book
                                            book={book}
                                            onChangetShelf={this.updateBoookShelf.bind(this)}
                                        />
                                    </li>
                                )
                            }
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                            {
                                this.state.books.filter((book) => book.shelf === 'read' ).map((book) =>
                                    <li key={book.title}>
                                        <Book
                                            book={book}
                                            onChangetShelf={this.updateBoookShelf.bind(this)}
                                        />
                                    </li>
                                )
                            }
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>Add a book </Link>
                </div>
              </div>
          )}/>
      </div>
    )
    }
}

export default BooksApp
