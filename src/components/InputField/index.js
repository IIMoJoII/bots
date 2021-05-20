import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function InputField({name, getText}) {
    const classes = useStyles();

    const handleGetText = (e) => {
        getText(e.target.value, name)
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField onChange={handleGetText} id="standard-basic" label={name} />
        </form>
    );
}
