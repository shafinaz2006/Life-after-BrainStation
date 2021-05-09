import React from 'react';
import axios from 'axios';
import './Styles.scss';
import Book from './Book';
const NYTIMES_API = process.env.REACT_APP_NYTIMES_API;

class Books extends React.Component{
    state = {
        bookCategoryList: [],
        bookByCategoryList: [],
        bookCategory:'Education',
        foundBookListByCategory: false,
    }

// get all the categories:

    getBookCatagory= () =>{
        axios
            .get(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${NYTIMES_API}`)
            .then(response =>{
                let bookCategoryListData = response.data.results.slice(27);
                this.setState({bookCategoryList: bookCategoryListData});
            })
            .catch(error => console.log('error', error));
    }

// get all the books by category:

    getBookByCategory = (category) =>{
        axios
            .get(`https://api.nytimes.com/svc/books/v3/lists/current/${category}.json?api-key=${NYTIMES_API}`)
            .then(response =>{
                // console.log(response.data.results);
                this.setState(
                    {bookByCategoryList: response.data.results.books,
                    bookCategory: response.data.results.list_name,
                    foundBookListByCategory: true
                });
            })
    }
    
// handle book search:

    handleBookSearchList = (event, searchQuery) =>{
        this.getBookByCategory(searchQuery);
        window.scrollTo(0, 0)
    }

// Component Mounting:

    componentDidMount(){
        this.getBookCatagory();
        this.getBookByCategory('Education');
    }
    render(){
        return(
            <section className='content'>
                {(this.state.bookCategoryList)?
                    <div className='content__genre'>
                        <h2 className='content__subHeading'>List of New York Times book categories </h2>
                        <ul className= 'list content__list'>
                        {this.state.bookCategoryList.map(bookCategory => 
                            <li className='item genreItem' key={bookCategory.list_name} 
                                onClick = {(event) => this.handleBookSearchList(event, bookCategory.list_name_encoded)}
                            >
                            {bookCategory.list_name}
                            </li>)
                        }
                        </ul>
                    </div>
                : <h2>Loading..</h2>
                }
                {this.state.foundBookListByCategory?
                    this.state.bookByCategoryList.length > 0? 
                    <div className='content__result'>
                        {this.state.bookCategory? 
                            <h2 className = 'content__subHeading'>Here are some suggestions on "{this.state.bookCategory}" </h2>
                            : ''
                        }
                        <ul className= 'list listByGenre'>
                        {
                            this.state.bookByCategoryList.map(book => <Book book={book} key={book.title}/>)
                        }
                        </ul>
                    </div>
                    : 
                    <div className='content__result content__result--error'>
                        <h3 className='content__errorHeading'>Oops!!</h3>
                        <h3 className='content__errorHeading'>No book in "{this.state.bookCategory}" category. </h3>
                        <h3 className='content__errorHeading'>Try another one!!!</h3>
                    </div>
                : ''
                }
            </section>
        )
    }
}
export default Books;