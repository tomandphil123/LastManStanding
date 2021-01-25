import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CrestBar() {

    const [crests, setCrests] = useState()
    useEffect(() => {
        axios.get('https://8yo67af9d5.execute-api.eu-west-1.amazonaws.com/dev/getTeamInfo')
        .then(response => {
            setCrests(response['data'])
        })
    }, [])

    return(
        typeof crests !== 'undefined' ? (
        <div style={{display: "flex", justifyContent:"center"}}>
            {crests.map((item) => (
                <div style={{padding: "5px"}}><a href={item['Website']}><img src={item['Crest']} height="40px"/></a></div>
            ))}
        </div>
        ) : (
            null
        )
    )
}