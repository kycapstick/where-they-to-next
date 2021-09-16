import { options } from "next-auth/client";

export default function DropDown({ id, name, label, value, setValue, options = [] }) {
    return (
        <div className="flex-col flex-grow mt-8">
            <label htmlFor={id} className="label block">{label}</label>
            <select id={id} value={value} onChange={(e) => setValue(e.target.value)} className="border block border-grey-50 flex-grow w-full appearance-none p-3 mt-4 paragraph">
                <option value="" disabled>Please Select</option>
                { 
                    options.length > 0 &&
                    options.map((option, index) => {
                        return (
                            <option key={`${id}-${index}`} value={option.value}>{option.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}