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
            setImage(null);
            try {
                const image = await uploadImage(e.target.files[0], user_id);
                setImage(image);
                setUploading(false);

            } catch(err) {
                setUploading(false);
            }
        }
    }

    const clearImage = (e) => {
        e.preventDefault();
        setImage(null);
    }
    const handleModalToggle = async () => {
        setOpenModal(!openModal);
    }
    return (
        <div>
            <h2 className="h3 mt-8 text-center">Image</h2>
            <p className="text-center pt-2">You can <a className="underline" onClick={handleModalToggle} href="#">select an existing image</a> or upload a new one below:</p>
            {
                image && image.url 
                ?
                <>
                    <div className="relative pt-image mt-8 w-full mx-auto bg-grey-10">
                        <div className="absolute inset-0">
                            <div className="flex justify-center">
                                <Image 
                                    src={ `${decodeURI(image.url)}` } 
                                    alt=""
                                    height={ 350 }
                                    width={ 350 }
                                    layout="intrinsic"
                                    objectFit="cover"
                                    objectPosition="center"
                                />
                            </div>
                        </div>
                    </div>
                    <button role="button" className="w-full text-center bg-black-400 text-white py-2" onClick={clearImage}>
                        remove image
                    </button>
                </>
                :
                <div className={`bg-grey-10 pt-image mt-8 w-full mx-auto`}>
                </div>
            }
            <div className="flex justify-center mt-8 text-center">
                <input className="" type="file" onChange={handleImageUpload} disabled={uploading} />
                {
                    openModal 
                    && 
                    <MediaModal 
                        open={openModal}
                        toggleModal={handleModalToggle}
                        user_id={user_id}
                        setImage={setImage}
                        setOpenModal={setOpenModal}
                    />                    
                }
            </div>
        </div>
    )
}