import { useState, useEffect } from 'react';
import Image from 'next/image'

import ImageEditor from './edit-image';
import DynamicIcon from '@/components/icons/DynamicIcon';

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
            }
            setLoading(false)
        } catch(err) {
            console.log(err);
        }
        
    }
    const openEditor = (imageObject) => {
        setEditImage(imageObject);
    }

    const handleBack = (e) => {
        e.preventDefault();
        setEditImage(false);
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
                    <div className="fixed inset-0 flex items-center p-40 bg-black-60">
                        <div className="bg-white p-10 mx-auto w-1/2 relative">
                            <button className="absolute top-0 right-0 p-6" role="button" onClick={toggleModal}>
                                <DynamicIcon 
                                    type="close"
                                    large={true}
                                    title="Close modal"
                                />
                            </button>
                            {
                                !loading && editImage &&
                                <div className="mt-8">
                                    <ImageEditor
                                        handleBack={handleBack}
                                        image={editImage}
                                        setImage={setImage}
                                        setOpenModal={setOpenModal }
                                    />
                                </div>
                            }
                            { !editImage && 
                                <h2 className="h4">Please select an image</h2>
                            }
                            { loading &&
                                <p className="mt-3">loading...</p> 
                            }
                            {
                                !loading && images.length > 0 && !editImage
                                && 
                                <>
                                    <ul className="flex mt-8 justify-center">
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
                                </>
                                            
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