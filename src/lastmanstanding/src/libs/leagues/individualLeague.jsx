import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

export default function IndividualLeague(props) {
    return (
        <div style={{backgroundColor: '#fff', height: '100px', width: '100px'}}>
            hello
            <Button color="primary" onClick={() => props.openLeague()}><CloseIcon/></Button>
        </div>
    );
}