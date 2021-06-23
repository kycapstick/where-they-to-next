export default function Headshot({ large = false }) {
    if (large) {
        return (
            <svg className="block max-w-full max-h-full text-beige-400" viewBox="0 0 739 739" height="739" width="739">
                <g transform="matrix(30.791666666666668,0,0,30.791666666666668,0,0)"><path d="M0.5 9.5L4.059 9.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.936 9.5L23.5 9.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3.998 8.500 A8.000 8.000 0 1 0 19.998 8.500 A8.000 8.000 0 1 0 3.998 8.500 Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 19L12 23.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1.5 23.5L22.5 23.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1.548,9.5a10.5,10.5,0,0,0,20.9,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></g>
            </svg>
        )
    }
    return (
        <svg viewBox="0 0 150 150" height="150" width="150"><g transform="matrix(6.25,0,0,6.25,0,0)"><path d="M0.5 9.5L4.059 9.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.936 9.5L23.5 9.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3.998 8.500 A8.000 8.000 0 1 0 19.998 8.500 A8.000 8.000 0 1 0 3.998 8.500 Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 19L12 23.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1.5 23.5L22.5 23.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M1.548,9.5a10.5,10.5,0,0,0,20.9,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
    )
}