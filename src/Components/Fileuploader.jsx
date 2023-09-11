import { useState } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const FileUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    console.log(selectedFiles)
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    return (

        <div className="ty5">
            <div className="container">
                <div><h2 className='fw-bold p-4 m1 text-center'>Multiple Images Upload</h2></div>
                <input type="file" multiple onChange={handleFileChange} className="t22" />
                <div>
                    {selectedFiles.length > 0 && (
                        <div>
                            <h4 className="t33">You Have Selected a Files:</h4>
                            <ul>
                                {Array.from(selectedFiles).map((file, index) => (
                                    <li key={index} className="t36">{file.name} </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="">
                        <AliceCarousel autoPlay autoPlayInterval={2000}>
                            {Array.from(selectedFiles).map((file, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="slidering ff3"
                                />
                            ))}
                        </AliceCarousel>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FileUploader;
