import { useSession } from 'next-auth/client'
import { useState } from 'react';

// Components
import Nav from '@/components/nav'
import Container from '@/components/container'
import ImageUploader from '@/components/image-uploader';
import TextInput from '@/components/text-input';
import Textarea from '@/components/textarea';
import Autocomplete from '@/components/autocomplete';
import Tags from '@/components/tags';
import ColorPicker from '@/components/color-picker';
import Tips from '@/components/tips-input';

export default function DashboardPage() {
    const [ session, loading ] = useSession();
    const [ errors, setErrors ] = useState([]);
    const [ image, setImage ] = useState(null);
    const [ name, setName ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ family, setFamily ] = useState([]) 
    const [ types, setTypes ] = useState([]);
    const [ color, setColor ] = useState('#000000');
    const [ tips, setTips ] = useState('');
    const [ tipsLink, setTipsLink ] = useState('');

    const submitForm = async() => {
        try {
            const response = await fetch(`/api/performers/create`, {
                method: 'POST',
                body: JSON.stringify({
                    name, 
                    bio,
                    family,
                    types
                })
            })
            const result = await response.json();
            console.log(result);
        } catch(err) {
            
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = [{name: 'name', value: name }];
        const checkedFields = requiredFields.filter((field) => !field.value || field.value === '');
        if (checkedFields.length > 0) {
            return setErrors(checkedFields);
        }
        submitForm();
    }

    const checkErrors = (e) => {
        if (errors.length > 0) {
            const updatedErrors = errors.filter((error) => error.name !== e.target.name);
            setErrors(updatedErrors);
        }
    }

    return (
        <>
            <Nav />
            <Container className="w-full lg:w-2/4">
                { 
                    errors.length > 0 && 
                    <>
                        <h2>Warning!</h2>
                        <p>This form includes the following <span className="color-red">{errors.length}</span> {errors.length > 1 ? 'errors' : 'error' }</p>
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}><a href={`#${error.name}`}>The {error.name} field is required.</a></li>
                            ))}
                        </ul>
                    </>
                }
                { session && session.id ?
                    <>
                        <h1 className="text-center text-3xl my-3">Create a Performer Profile</h1>                
                        <form action="" onSubmit={handleSubmit}>
                            <div className="py-6">
                                <TextInput 
                                    name="name"
                                    label="Name"
                                    value={name}
                                    onChange={ setName }
                                    onKeypress={ checkErrors }
                                />
                            </div>
                            <div className="py-6">
                                <Textarea 
                                    name="bio"
                                    label="Bio"
                                    value={bio}
                                    onChange={setBio}
                                />
                            </div>
                            <ImageUploader 
                                user_id={session.id ? session.id : null }
                                image={image}
                                setImage={ setImage }
                            />
                            <Autocomplete 
                                name="family"
                                label="Family"
                                type="families"
                                selections={family}
                                makeSelection={setFamily}
                            />
                            <Tags 
                                name="tags"
                                label="Add performer tags"
                                type="performer_types"
                                selections={types}
                                makeSelection={setTypes}
                            />
                            <ColorPicker 
                                value={color}
                                setValue={setColor}
                                errors={errors}
                                setErrors={setErrors}
                            />
                            <Tips 
                                tips={tips}
                                tipsLink={tipsLink}
                                setTips={setTips}
                                setTipsLink={setTipsLink}
                            />
                            <input type="submit" value="Create Performer" />
                        </form>
                    </> 
                    : 
                    <p>Loading...</p>
                    
                }
            </Container>
        </>
    )
}