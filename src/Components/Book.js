import './Styles.scss';

function Book({book}){
    return(
        <section className='flip-card'>
            <div className='flip-card-inner'>
                <div className='flip-card-front'>
                    <img src={book.book_image} alt="book poster" className= 'section__poster'/>
                </div>
                <div className="flip-card-back">
                    <h3 className='flip-card-back__heading'>{book.title}</h3> 
                    <p className='flip-card-back__author'>{book.author}</p> 
                    <p className='flip-card-back__desc'>{book.description}</p>
                </div>
            </div>
        </section>
    );
}
export default Book;