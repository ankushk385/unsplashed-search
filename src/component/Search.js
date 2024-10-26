import { useEffect,useState, useRef } from 'react';
import axios from 'axios'

function Search({ onSelectImage }) {
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);

    const fetchImages = async (query) => {
        const response = await axios.get(
            `https://api.unsplash.com/search/photos`, {
                params: { query, client_id: process.env.REACT_APP_UNSPLASH_KEY }
            });
        return response.data.results;

      
    };

    const handleSearch = async () => {
       
        const results = await fetchImages(query);
        setImages(results);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search images"
            />
            <button onClick={handleSearch}>Search</button>
            <div className="image-results">
                {images.map((img) => (
                    <div key={img.id}>
                        <img src={img.urls.small} alt={img.alt_description} />
                        <button onClick={() => onSelectImage(img.urls.full)}>Add Captions</button>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Search;