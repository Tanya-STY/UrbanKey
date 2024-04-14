import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
    const [previewImages, setPreviewImages] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image'));
        const imagePreviews = imageFiles.map(file => URL.createObjectURL(file));
        setPreviewImages(imagePreviews);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        previewImages.forEach((image, index) => {
            formData.append(`file${index}`, image);
        });

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // Handle success response
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error response
        }
    };

    return (
        <div className="container">
            <h4>Flask React upload images</h4>
            <form className="mt-4" encType="multipart/form-data">
                <div className="form-group">
                    <input type="file" name="file" id="input-files" className="form-control-file border" onChange={handleFileChange} multiple />
                </div>
            </form>
            <button className="btn btn-primary" onClick={handleSubmit}>Upload</button>
            <div className="row">
                {previewImages.map((image, index) => (
                    <div className="col-sm-4" key={index}>
                        <img src={image} alt={`Preview ${index}`} className="img-thumbnail" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadImage;
