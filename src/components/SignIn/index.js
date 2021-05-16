import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import bcryptjs from 'bcryptjs'

import s from './style.module.css'


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function SignInForm({setUserData}) {
    const classes = useStyles();
    const [login, setLogin] = React.useState()
    const [password, setPassword] = React.useState()

    const handleInputLogin = (e) => {
        if(e.currentTarget){
            setLogin(e.currentTarget.value);
        }
    }

    const handleInputPassword = (e) => {
        if(e.currentTarget){
            setPassword(e.currentTarget.value);
        }
    }

    const setUserDataCallback = React.useCallback((login, password) => {
        let salt = bcryptjs.genSaltSync(10);
        let hashedLogin = bcryptjs.hashSync(login, salt);
        let hashedPassword = bcryptjs.hashSync(password, salt)

        setUserData(hashedLogin, hashedPassword)
    }, [setUserData])

    return (
        <div className={s.signInForm}>
            <form className={classes.root} noValidate autoComplete="off">

                <div className={s.form}>
                    <TextField
                        onChange={handleInputLogin}
                        required
                        id="standard-required"
                        type='text'
                        label="Login" />
                    <TextField
                        onChange={handleInputPassword}
                        required
                        id="standard-password-input"
                        label="Password"
                        type="password"
                    />
                </div>

                <div className={s.signInBtn}>
                    <Button onClick={() => setUserDataCallback(login, password)} variant="outlined" color="primary">
                        Authorise
                    </Button>
                </div>

            </form>
        </div>
    );
}
