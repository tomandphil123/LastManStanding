import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

export default function IndividualLeague(props) {
    if (typeof props.user !== 'undefined') {
        return (
            <div style={{backgroundColor: '#fff', height: '100px', width: '100px'}}>
                {props.user['data'][0]['LeagueID']}
                <Button color="primary" onClick={() => props.closeLeague()}><CloseIcon/></Button>
            </div>
        );
    } else {
        return (
            <div/>
        )
    }
}