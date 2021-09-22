import TextInput from '@/components/text-input';

export default function DatePicker({ date, setDate, month, setMonth, year, setYear, doors, setDoors, showTime, setShowTime }) {
    const handleChange = (handler, value) => {
        if (value === '') {
            value = 0;
        }
        const valid = /^\d+$/.test(value);
        if (valid) {
            handler(value);
        }
        
    }
    return (
        <div className="my-6">
            <h2 className="h3 text-center">Date & Time</h2>
            <div className="flex justify-center">
                <div className="flex-one-third">
                    <div className="flex mt-8">
                        <div>
                            <label className="block label" htmlFor="year">Year</label>
                            <input className="border block border-grey-50 p-3 mt-4 paragraph w-full" id="year" type="text" value={year} maxLength={4} onChange={(e) => { handleChange(setYear, e.target.value)}} placeholder="YYYY"/>
                        </div>
                        <div className="ml-4">
                            <label className="block label" htmlFor="month">Month</label>
                            <input className="border block border-grey-50 p-3 mt-4 paragraph w-full" id="month" type="text" value={month} maxLength={2}  onChange={(e) => { handleChange(setMonth, e.target.value)}} placeholder="MM" />
                        </div>
                        <div className="ml-4">
                            <label htmlFor="date" className="block label">Date</label>
                            <input id="date" className="border block border-grey-50 p-3 mt-4 paragraph w-full" type="text" value={date} maxLength={2}  onChange={(e) => { handleChange(setDate, e.target.value)}} placeholder="DD" />
                        </div>
                        </div>
                </div>                   
            </div>
            <div className="flex justify-center">
                <div className="flex-one-third">
                    <TextInput 
                        name="doors"
                        label="Doors"
                        value={doors}
                        onChange={setDoors}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex-one-third">
                    <TextInput 
                        name="show-time"
                        label="Show Time"
                        value={showTime}
                        onChange={setShowTime}
                        helperText="If a different time than doors"
                    />
                </div>
            </div>
        </div>
    )
}