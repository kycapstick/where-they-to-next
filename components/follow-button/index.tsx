import cn from 'clsx'
import { useState, useEffect } from 'react'

function FollowButton({
    accentColor = "#000000",
    entry_id,
    user_id,
    route
}) {
    const [ hover, setHover ] = useState(false);
    const [ followingId, setFollowingId ] = useState(false);
    const checkFollowing = async () => {
        if (user_id && entry_id) {
            const url = `/api/performers/following?id=${entry_id}&user_id=${user_id}`;
            const resp = await window.fetch(url);
            const data = await resp.json();
            if (data.length) {
                const { id } = data[0];
                setFollowingId(id);
            }
        }
    }
    const handleFollow = async () => {
        const url = `/api/${route}/following/?id=${entry_id}&user_id=${user_id}`;
        const res = await window.fetch(url, { 
            method: 'POST'
        })
        const { insertId } = await res.json();
        return setFollowingId(insertId);
    }
    const handleUnfollow = async () => {
        const url = `/api/${route}/following/?id=${followingId}`;
        const res = await window.fetch(url, { 
            method: 'DELETE'
        })
        return setFollowingId(false);
    }
    useEffect(() => {
        checkFollowing();
    }, [])
    return (
        <button
            className={`${hover ? 'text-white border-white' : ''} py-5 px-16 mb-4 text-center border-2 border-black relative font-bold paragraph group transition-all duration-7`}
            style={{ backgroundColor: hover ? accentColor : 'white' }}
            onClick={ !followingId ? () => handleFollow() : () => handleUnfollow()  }
            onMouseEnter={ () => setHover(true)}
            onMouseLeave={ () => setHover(false)}
        >
            <span className="w-full h-full absolute inset-0 -z-1 border-2 transform translate-y-3 translate-x-3 group-hover:-translate-x-3 group-hover:-translate-y-3 transition-transform duration-7" style={{ borderColor: accentColor}}></span>
            {followingId ? 'Unfollow' : 'Follow' }
        </button>
    )
}

export default FollowButton
