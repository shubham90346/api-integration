import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';

import SimpleImageSlider from "react-simple-image-slider";


function Imageuploader(props) {


    const [images, setImages] = useState([]);
    const [filess, setfiless] = useState([])
    console.log(images)



    const handleMultipleImages = (evnt) => {
        const selectedFIles = [];
        const targetFiles = evnt.target.files;

        const targetFilesObject = [...targetFiles]
        setfiless(targetFilesObject)
        targetFilesObject.map((file) => {
            return selectedFIles.push(URL.createObjectURL(file))
        })
        setImages(selectedFIles);

    }

    return (
        <div>
            <form>
                <div><h2 className='fw-bold p-4 m1 text-center'>Multiple Images Upload</h2></div>
                <input type="file" className='t22' onChange={handleMultipleImages} multiple />
            </form>
            <br />
            <div className='container'>
                <div className="row">
                    <AliceCarousel autoPlay autoPlayInterval={2000} >
               {
                        images.map((url) => {
                            return (
                                <div className="card">
                               <img src={url} className='ff3'/> 
                                </div>
                            )
                        })
                    }
               </AliceCarousel>
                   


                </div>
            </div>
        </div>
    );
}

export default Imageuploader;