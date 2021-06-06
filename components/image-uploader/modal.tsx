import { useState, useEffect } from 'react';
import Image from 'next/image'

import ImageEditor from './edit-image';

export default function MediaModal({ open:boolean  = false, toggleModal, user_id, setImage, setOpenModal }) {    
    const [ images, setImages ] = useState([]);
    const [ editImage, setEditImage ] = useState(false);
    const [ page, setPage ] = useState(0);
    const [ count, setCount ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const getCount = async() => {
        try {
            const rowCount = await window.fetch(`/api/images/count?user_id=${user_id}`)
            const count = await rowCount.json();
            if (count) {
                setCount(count);
            }
        } catch(err) {
            console.log(err);
        }
    }

    const getImages = async() => {
        try {
            const resp = await window.fetch(`/api/images?user_id=${user_id}`);
            const { results } = await resp.json();
            if (results.length) {
                setImages(results);
                setLoading(false)
            }
        } catch(err) {
            console.log(err);
        }
        
    }
    const openEditor = (imageObject) => {
        setEditImage(imageObject);
    }

    useEffect(() => {
        getImages();
        getCount(); 
    }, []);
    
    return (
        <> 
            {
                open 
                    ?
                    <div className="fixed inset-0 flex items-center p-40 bg-black-trans50">
                        <div className="bg-white p-32 w-full">
                            <button onClick={toggleModal}>
                                X
                            </button>
                            { loading &&
                                <p>loading...</p> 
                            }
                            {
                                !loading && editImage &&
                                <ImageEditor
                                    image={editImage}
                                    setImage={setImage}
                                    setOpenModal={setOpenModal }
                                />
                            }
                            {
                                !loading && images.length && !editImage
                                && 
                                <ul className="flex">
                                    {
                                        images.map((image) => {
                                            return (
                                                <li
                                                    key={image.id}
                                                >
                                                    <a href="#" onClick={() => { openEditor({ id: image.id, url: image.url, alt: image.alt }) }}>
                                                        <Image 
                                                            src={decodeURI(image.url)}
                                                            alt={image.alt}
                                                            width={200}
                                                            height={200}
                                                            layout="intrinsic"
                                                            objectFit="contain"
                                                            objectPosition="center"
                                                        />
                                                    </a>
                                                </li>
                                            )
                                        })  
                                    }           
                                </ul>                    
                            }
                            {
                                !loading && !images.length && !editImage && <p>No images found.</p>
                            }
                        </div>
                    </div>
                    :
                    null
            }
            
        </>
    )
}