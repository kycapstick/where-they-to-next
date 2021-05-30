import Image from 'next/image'

export default function ImageUploader({ image }) {
    const updateImageAlt = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <Image 
                src={decodeURI(image.url)}
                alt={image.alt}
                width={500}
                height={500}
            />
            <div>
                <label htmlFor="image_alt">Description</label>
                <textarea className="border-black border-2 block w-full" id="image_alt" name="image_alt">
                </textarea>
                <button className="p-2" role="button" onClick={updateImageAlt}>
                    Update image description
                </button>
            </div>
        </div>
    )
}