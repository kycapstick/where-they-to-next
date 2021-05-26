import cn from 'clsx'
import { useState, useEffect } from 'react'

function FollowButton({
    accentColor = "#000000",
    entry_id,
    user_id,
    route
}) {
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
            className={cn(
                'bg-black',
                'text-white',
                'p-2',
                'rounded',
                'uppercase',
                'text-sm',
                'font-bold',
            )}
            style={{ backgroundColor: accentColor}}
            onClick={ !followingId ? () => handleFollow() : () => handleUnfollow()  }
        >
            {followingId ? 'Unfollow' : 'Follow' }
        </button>
    )
}

export default FollowButton
