import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

export default function dashboardList(props) {
    const { entries, isLoading, title = 'performers' } = props;
    return (
        <div>
            <h2>{title}</h2>
            <ul>
                {
                    isLoading 
                        ? 
                            <li>Loading</li> 
                        :
                        entries.map((entry) => {
                            return <li>{entry.name}</li>
                        })
                }
                    
            </ul>
        </div>
    )
}