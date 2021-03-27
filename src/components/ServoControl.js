import React, { useState, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Slider, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useSocket from '../hooks/useSocket';
import { SERVO_TOPIC } from '../constants/topics';

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
    svg: {
        marginLeft: 5,
        "& #poly2": {
            transform: 'translate(10%)',
            transition: 'all .5s ease' // Back to orig. state when exiting :hover smoothly
        }
    },
    sendbtn: {
        "&:hover #poly2" : {
            transition: 'all .5s ease',
            transform: "translate(30%)",
        }
    }
}));

export default function ServoControl() {

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const socket = useSocket();
    const theme = useTheme();

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
                value: value
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
                    <br/>
                    <Typography variant="subtitle1" align="center">{value}°</Typography>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        max={180}
                    />
                </CardContent>
                <CardActions>
                    <Button className={classes.sendbtn} variant="contained" color="primary" onClick={emmitData}>    
                        Execute 
                        <svg className={classes.svg} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 43 33">
                            <path id='poly1' data-name="Polygone 1" d="M22.468 12.9a3 3 0 010 5.2L4.494 28.42A3 3 0 010 25.819V5.181a3 3 0 014.494-2.6z" fill={theme.palette.text.secondary}/>
                            <path id='poly2' data-name="Polygone 2" d="M28.468 12.9a3 3 0 010 5.2L10.494 28.42A3 3 0 016 25.819V5.181a3 3 0 014.494-2.6z" fill={theme.palette.text.primary}/>
                        </svg>
                    </Button>
                </CardActions>
            </Card>
        </div >
    )
}