// App.js
import React, { useState } from "react";
import ImageEditor from "./component/ImageEditor";
import "./App.css";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios
        .get("https://api.unsplash.com/search/photos", {
          params: { query, per_page: 4 },
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
        })
      

      setImages(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {!selectedImage && (
        <div className="search-page">
          <h1>Search Page</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "25%",
            }}
          >
            <h5>
              {" "}
              Name : <span>Ankush</span>{" "}
            </h5>
            <h5>
              {" "}
              Email : <span>akwriting385@gmail.com</span>{" "}
            </h5>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search images..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="image-grid">
            {images?.map((image) => (
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                onClick={() => setSelectedImage(image.urls.regular)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="image-editor">
        {selectedImage && <ImageEditor imageUrl={selectedImage} />}
      </div>
    </div>
  );
}

export default App;
