import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './UploadImage.scss';

const UploadImage = (props: any) => {
    const { setValues, field } = props;

    console.log('field.images: ', field.value);
    const [selectedImage, setSelectedImage] = useState<any>([]);
    const handleAddImage = (e: any) => {
        if (e.target?.files.length > 0) {
            setSelectedImage((prev: any) => [...prev, e.target.files[0]]);
        }
    };
    const handleDeleteImage = (id: number) => {
        const newListImage = selectedImage.filter((item: any) => item.lastModified !== id);
        setSelectedImage(newListImage);
    };

    useEffect(() => {
        const selectedImageName = selectedImage.map((item: any) => item.name);
        setValues((prev: any) => ({ ...prev, imagesOrder: selectedImageName }));
    }, [selectedImage]);
    return (
        <div>
            <input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                onChange={(e: any) => {
                    handleAddImage(e);
                }}
            />
            <br />
            <div className="list-image">
                {selectedImage.length > 0 ? (
                    selectedImage.map((item: any) => (
                        <div key={item.lastModified} className="image-wrapper">
                            <img alt="not fount" width={'120px'} height={'120px'} src={URL?.createObjectURL(item)} />
                            <FontAwesomeIcon
                                className="delete-image"
                                icon={faCircleXmark}
                                onClick={() => handleDeleteImage(item.lastModified)}
                            />
                        </div>
                    ))
                ) : (
                    <></>
                )}
                <br />
            </div>
        </div>
    );
};

export default UploadImage;
