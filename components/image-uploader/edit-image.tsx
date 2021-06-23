import Image from 'next/image'
import { useState, useEffect } from 'react';

// Components 
import Textarea from '@/components/textarea';
import DynamicIcon from '../icons/DynamicIcon';

export default function ImageUploader({ image, setImage, setOpenModal, handleBack }) {
    const [ description, setDescription ] = useState();
    const [ loading, setLoading ] = useState(false)
    const updateImageAlt = () => {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await fetch('/api/images/edit', {
                    method: 'POST',
                    body: JSON.stringify({
                        description,
                        id: image.id
                    }),
                })
                const result = await response.json();
                return resolve(true);
            } catch (err) {
                console.log(err);
                return reject(err);
            }
        })
    }

    const handleImageSelection = async (e) => {
        e.preventDefault();
        setLoading(true);
        setImage(image);
        await updateImageAlt();
        setOpenModal(false);
    }

    useEffect(() => {
        const newDesc = image.alt ? image.alt : '';
        setDescription(newDesc);
    }, [])
    return (
        <>
            <button role="button" className="absolute top-0 left-0 p-6" onClick={handleBack}><DynamicIcon type="back" large={true} title="Select another image" /></button>
            <h2 className="h4">Add/Edit Image Description</h2>
            <p className="paragraph pt-2 italic">To ensure accessiblity a description is required for all images.</p>
            { !loading && 
                <>
                    <div className="flex justify-between mt-8">
                    <div className="relative w-1/2">
                        <Image 
                            src={decodeURI(image.url)}
                            alt={image.alt}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                        />
                    </div>
                    <div className="flex-grow ml-6">
                        <Textarea 
                            name="image_alt"
                            onChange={setDescription}
                            value={description}
                            label="Description"
                        />
                    </div>
                </div>
                <button
                    className="block mt-8 text-center w-full py-2 border disabled:bg-black-60 text-white bg-black-400"
                    role="button"
                    disabled={ description === ''}
                    onClick={handleImageSelection}
                >
                    Choose Image
                </button>
                </>
            }
            { loading &&
                <p className="mt-4">Loading...</p>
            }
            
        </>
    )
}