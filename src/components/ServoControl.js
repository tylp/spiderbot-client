import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardHeader, Slider, TextField, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import useSocket from '../hooks/useSocket';
import { SERVO_TOPIC } from '../constants/topics';
import ExecuteButton from './common/ExecuteButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    slider: {
        paddingTop: '10px',
        paddingBottom: theme.spacing(3)
    },
    angularSelect: {
        marginTop: theme.spacing(3)
    }
}));

export default function ServoControl() {

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const socket = useSocket();
    const [pin, setPin] = useState(1);

    useEffect(() => {
        if (socket) {
            socket.on(SERVO_TOPIC, message => {
                console.log(message)
            });
        }
    }, [socket]);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    function emmitData() {
        socket &&
            socket.emit(SERVO_TOPIC, {
                id: new Date().getTime(),
                value: value,
                pin: pin
            });
    }

    return (
        <div className={classes.root}>
            <Card elevation={6}>
                <CardHeader
                    title="Servo Controller"
                    subheader="Angular rotation to execute"
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                />

                <CardContent>
                    <Typography variant="body2">
                        Topic : <b>{SERVO_TOPIC}</b>
                    </Typography>
                    <TextField value={pin} label="pin" min="0" type="number" onChange={e => setPin(parseInt(e.target.value))}></TextField>
                    <Typography className={classes.angularSelect} variant="subtitle1" align="center">{value}°</Typography>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        max={180}
                    />
                </CardContent>
                <CardActions>
                    <ExecuteButton variant="contained" color="primary" onClick={emmitData}>    
                        Execute 
                    </ExecuteButton>
                </CardActions>
            </Card>
        </div >
    )
}