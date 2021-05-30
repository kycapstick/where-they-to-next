import { useState } from 'react';

// Scripts
const { uploadImage } = require('../../scripts/image-upload');

// Components 
import MediaModal from "./modal";

export default function ImageUploader(props) {
    const { user_id } = props;
    const [ uploading, setUploading ] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState('');

    const handleImageUpload = async (e) => {
        if (e.target.files && e.target.files.length) {
            setUploading(true);
            try {
                const imageUrl = await uploadImage(e.target.files[0], user_id);
                setImageUrl(imageUrl);
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
                imageUrl !== '' 
                ?
                <img src={ imageUrl } alt="" />
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