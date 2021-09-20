import TextInput from "../text-input"
import Checkbox from "../checkbox"
import DropDown from "../dropdown"
import provinces from "../../lib/provinces";

export default function Address({ address, setAddress, digital, setDigital, city, setCity, province, setProvince, checkErrors }) {
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
            <TextInput 
                name="address"
                label={digital ? 'URL' : 'Address'}
                value={address}
                onChange={ setAddress }
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
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}