import React, { useEffect, useState } from "react";
import axios from "axios";
import "./photos.css";

const Photos = () => {
    const [randomPhotos, setRandomPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const getRandomPhotos = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.imgflip.com/get_memes`);
            setTimeout(() => {
                setLoading(false);
            }, 2000)
            return response.data.data.memes;
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
            }, 2000)
            console.log(error);
        }
    };
    
    const handleImages = async () => {
        const images = await getRandomPhotos();
        const randomImages = images.sort(() => Math.random() - 0.5);
        console.log("images:", images);
        console.log("randomImages:", randomImages);
        setRandomPhotos(randomImages);
    };

    console.log("loading:", loading)

    useEffect(() => {
        handleImages();
    }, []);

    return (
        <div className="photos_component">
            <div className={`photos_btn ${loading ? "btn_allowed" : ""}`}>
                <button onClick={loading ? null : handleImages } >
                    Load Images
                </button>
            </div>
            {loading && (
                <div className="photos_loading animate-spin"></div>
            )}
            <div className="photos_list">
                {!loading && randomPhotos.length > 0 &&
                    randomPhotos.map((item, index) => (
                       <div
                            key={`${item.url}-${index}`}
                            className="photos_item"
                        >
                            <img
                                src={item.url}
                                alt={item.name}
                                // style={{ width: item.width, height: item.height}}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Photos;
