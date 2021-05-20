import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 215,
    },
}));

export default function DatePickers({date, getDate}) {
    const classes = useStyles();

    const handleGetDateCallback = React.useCallback((newDate) => {
        getDate(newDate)
    }, [getDate])

    const handleChangeData = (e) => {
        handleGetDateCallback(e.target.value)
    }

    return (
        <form style={{marginTop: -3}} className={classes.container} noValidate>
            <TextField
                id="date"
                type="date"
                defaultValue={date}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => handleChangeData(e)}
            />
        </form>
    );
}
