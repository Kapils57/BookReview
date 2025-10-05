    import React,{useState, useEffect} from 'react'
    import "../css/Books.css";
    import BookCard from '../components/BookCard'
  
    function Books() {
        const [searchquery, setsearchquery]=useState("")
       
        const [books, setBooks] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const loadBooks = async () => {
            try {
                const response = await fetch("https://bookreview3-backend.onrender.com/api/books/getbooks", {
                    method: "GET",
                });

                const data = await response.json();
                // console.log(data.data);
                setBooks(data.data);

            } catch (err) {

                console.log(err);
                setError("Failed to load Books...");

            } finally {

                setLoading(false);

            }
        };
            loadBooks();
        }, []);

          const handleSearch = async (e) => {
            e.preventDefault();
            if (!searchquery.trim()) return
            if (loading) return

            setLoading(true)
            try {
                const response = await fetch(`https://bookreview3-backend.onrender.com/api/books/getbooks/search?query=${encodeURIComponent(searchquery)}`);
                const data = await response.json();
                // console.log(data.data);
                setBooks(data.data);             // ✅ set the search results in state
                setError(null);

            } catch (err) {

                console.log(err)
                setError("Failed to search movies...")

            } finally {

                setLoading(false)

            }
        };
    return (
        
        <div className='home'>
            <form className='search-form'>
                <input type="text" placeholder='Search for Books..' className='search-input' value={searchquery} onChange={(e)=>setsearchquery(e.target.value)}/>
                <button type='submit' className='search-btn'  onClick={handleSearch} >Search</button>
            </form>


            {error && <div className="error-message">{error}</div>}


            

            {/* {loading ? (
                <div className="loading">Loading...</div>
                ) : (
                    <div className='movie-grid'>
                        {books.map(book => (
                        <BookCard book={book} key={book._id} />
                    ))}
                    </div>
            )} */}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className='movie-grid'>
                {books
                    .filter(book => {
                        if (!searchquery) return true; // show all if search is empty
                        return book.title.toLowerCase().includes(searchquery.toLowerCase());
                    })
                    .map(book => (
                        <BookCard book={book} key={book._id} />
                    ))
                }
            </div>
                
            )}

            
        </div>
    )
    }

    export default Books
