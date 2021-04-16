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
            <section className='section background--book'>
                <h2 className='section__heading2'>Choose your favourite book from NY times Best sellers book category</h2>
                {this.state.bookCategory? 
                    <h2 className = 'section__titleSecond'>Here are some suggestions on {this.state.bookCategory} </h2>
                    : ''
                }
                <div className= {this.state.foundBookListByCategory.length? 'whole': 'wholeRegular'}>
                    {(this.state.bookCategoryList)?
                        <ul className= 'list whole-left'>
                        {this.state.bookCategoryList.map(bookCategory => 
                            <li className='item bookItem' key={bookCategory.list_name} 
                                onClick = {(event) => this.handleBookSearchList(event, bookCategory.list_name_encoded)}
                            >
                            {bookCategory.list_name}
                            </li>)
                        }
                        </ul>
                    : <h2>Loading..</h2>
                    }
                    <div className = 'whole-right'>
                        {(this.state.foundBookListByCategory)?
                            this.state.bookByCategoryList.length > 0? 
                                <ul className= 'section__list listByGenre'>
                                {
                                    this.state.bookByCategoryList.map(book => <Book book={book} key={book.title}/>)
                                }
                                </ul>
                            : <h3>Oops!!! No movie in this category. Try another one!!!</h3>
                        : ''
                        }
                    </div>
                </div>
            </section>
        )
    }
}
export default Books