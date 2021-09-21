import { useState } from 'react';

export default function DatePicker({ date, setDate }) {
    const [ year, setYear ] = useState(0);
    const [ month, setMonth ] = useState(0);
    const [ day, setDay ] = useState(0);
    
    const handleChange = (handler, value) => {
        if (value === '') {
            value = 0;
        }
        const valid = /^\d+$/.test(value);
        if (valid) {
            handler(Number(value));
        }
    }
    return (
        <div className="my-6">
            <h2 className="h3 text-center">Date & Time</h2>
            <div className="flex justify-center">
                <div>
                    <label className="block" htmlFor="year">Year</label>
                    <input className="border block border-grey-50 flex-grow w-full p-3 mt-4 paragraph" id="year" type="text" value={year} maxLength={4} onChange={(e) => { handleChange(setYear, e.target.value)}} placeholder="YYYY"/>
                </div>
                <div className="ml-4">
                    <label className="block" htmlFor="month">Month</label>
                    <input className="border block border-grey-50 flex-grow w-full p-3 mt-4 paragraph" id="month" type="text" value={month} maxLength={2}  onChange={(e) => { handleChange(setMonth, e.target.value)}} placeholder="MM" />
                </div>
                <div className="ml-4">
                    <label htmlFor="date" className="block">Date</label>
                    <input id="date" className="border block border-grey-50 flex-grow w-full p-3 mt-4 paragraph" type="text" value={day} maxLength={2}  onChange={(e) => { handleChange(setDay, e.target.value)}} placeholder="DD" />
                </div>
            </div>
        </div>
    )
}