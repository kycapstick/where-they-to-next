import Image from 'next/image'
import { useState, useEffect } from 'react';

export default function ImageUploader({ image, setImage, setOpenModal }) {
    const [ description, setDescription ] = useState();
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
        setImage(image);
        await updateImageAlt();
        setOpenModal(false);
    }

    const handleInput = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    }
    useEffect(() => {
        const newDesc = image.alt ? image.alt : '';
        setDescription(newDesc);
    }, [])
    return (
        <div>
            <Image 
                src={decodeURI(image.url)}
                alt={image.alt}
                width={500}
                height={500}
                objectFit="contain"
                objectPosition="center"
            />
            <div>
                <label htmlFor="image_alt">Description</label>
                <textarea 
                    className="border-black border-2 block w-full" 
                    id="image_alt" 
                    name="image_alt"
                    onChange={handleInput}
                    value={description}
                >
                </textarea>
                <button
                    role="button"
                    onClick={handleImageSelection}
                >
                    Choose Image
                </button>
            </div>
        </div>
    )
}