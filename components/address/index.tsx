import TextInput from "../text-input"
import Checkbox from "../checkbox"
import DropDown from "../dropdown"
import provinces from "../../lib/provinces";
import Autocomplete from "../autocomplete";

export default function Address({ address, setAddress, digital, setDigital, city, setCity, province, setProvince, checkErrors, select = false, venue = null, setVenue = null, venueInfo = null, setVenueInfo = null }) {
    return ( 
        <div>
            <h2 className="h3 mt-8 text-center">Address</h2>
            <div className="text-center">
                <Checkbox 
                    name="digital"
                    value={digital}
                    setValue={setDigital}
                    id="digital"
                    label="This is a digital venue."
                />
                </div>
            {
                select && 
                <>
                    { 
                    venueInfo?.name
                        ? 
                        <>
                            <TextInput 
                                name="venue"
                                label="Venue Name"
                                value={venueInfo.name}
                                onChange={ () => {} }
                                onKeypress={ checkErrors }
                                disabled={true}
                            />
                            <button onClick={setVenueInfo}>Clear selection</button>
                        </>
                        : 
                        <Autocomplete 
                            name="venue"
                            label="Venue Name"
                            type="venues"
                            selections={venue}
                            makeSelection={setVenue}
                        />
                    }
                </>
            }
            <TextInput 
                name="address"
                label={digital ? 'URL' : 'Address'}
                value={address}
                onChange={ setAddress }
                disabled={ venueInfo?.id }
                onKeypress={ checkErrors }
            />
            {
                !digital &&
                <>
                    <div className="flex">
                        <div className="flex-grow flex-half">
                            <TextInput 
                                name="city"
                                label="City"
                                value={city}
                                onChange={ setCity }
                                onKeypress={ checkErrors }
                                disabled={ venueInfo?.id }

                            />
                        </div>
                        <div className="ml-4 flex-half">
                            <DropDown 
                                id="province"
                                name="province"
                                label="Province/Territory"
                                value={province}
                                setValue={ setProvince }
                                options={provinces}
                                disabled={ venueInfo?.id }
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}