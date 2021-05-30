import { useState } from 'react';
import Image from 'next/image'

import { useImage } from '@/lib/swr-hooks'

// Scripts
const { uploadImage } = require('../../scripts/image-upload');


// Components 
import MediaModal from "./modal";

export default function ImageUploader({ user_id, setImage, image }) {
    const [ uploading, setUploading ] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);

    const handleImageUpload = async (e) => {
        if (e.target.files && e.target.files.length) {
            setUploading(true);
            try {
                const image = await uploadImage(e.target.files[0], user_id);
                setImage(image);
                setUploading(false);

            } catch(err) {
                setUploading(false);
            }
        }
    }
    const handleModalToggle = async () => {
        setOpenModal(!openModal);
    }
    return (
        <>
            {
                image && image.url 
                ?
                <Image 
                    src={ image.url } 
                    alt=""
                    height={ 500 }
                    width={ 500 }
                    layout="responsive"
                    objectFit="contain"
                    objectPosition="center"
                />
                :
                null
            }
            <input type="file" onChange={handleImageUpload} disabled={uploading} />
            {
                openModal 
                ? 
                <MediaModal 
                    open={openModal}
                    toggleModal={handleModalToggle}
                    user_id={user_id}
                    setImage={setImage}
                    setOpenModal={setOpenModal}
                />
                : 
                <button
                    onClick={handleModalToggle}
                >
                    Choose image
                </button>
            }
        </>
    )
}