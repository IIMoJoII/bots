import React from 'react';
import bots from '../../bots.json'
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import ErrorIcon from '@material-ui/icons/Error';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import s from './style.module.css'
import DatePickers from "../DatePicker";


export default function BotsPage({deleteUserData}) {
    const botsArr = bots;
    const [stateMenu, setStateMenu] = React.useState(false)
    const [moodMenu, setMoodMenu] = React.useState(false)
    const [modeMenu, setModeMenu] = React.useState(false)
    const [clickID, setClickID] = React.useState(null)


    const handleLogOutCallback = React.useCallback(() => {
        deleteUserData()
    }, [deleteUserData])

    const handleStatusClick = (id, info) => {
        setClickID(id)

        if(info === 'status')
            setStateMenu(!stateMenu)
        else if(info === 'mood')
            setMoodMenu(!moodMenu)
        else if(info === 'mode')
            setModeMenu(!modeMenu)
    }

    const handleStateParameterClicked = (parameter, id, info) => {
        const index = botsArr.bots.map(e => e.id).indexOf(id);

        if(info === 'status') {
            botsArr.bots[index].state.status = parameter
            setStateMenu(!stateMenu)
        } else if(info === 'mood'){
            botsArr.bots[index].state.mood = parameter
            setMoodMenu(!moodMenu)
        } else if(info === 'mode'){
            botsArr.bots[index].state.mode = parameter
            setModeMenu(!modeMenu)
        }
    }

    const handleGetDate = (newDate, id) => {
        const index = botsArr.bots.map(e => e.id).indexOf(id);

        botsArr.bots[index].cfg.timestamp = newDate

        console.log(botsArr)
    }


    return(
        <>
            <div className={s.botsPage}>
                <div className={s.bots}>

                    <div className={s.headers}>
                        <h1>Your Bots</h1>
                        <button className={s.logout} onClick={handleLogOutCallback}>Logout</button>
                    </div>

                    {botsArr.bots.map((info) => <div key={info.id} className={s.botInfo}>
                        <div className={s.botParams}>
                            <p>ID: {info.id}</p>
                        </div>
                        <div className={s.botParams}>
                            <p>Token: {info.token}</p>
                        </div>
                        <div className={s.botParams}>
                            <p>State:</p>
                            <div className={s.state}>
                                <div className={s.stateParams}>
                                    <span onClick={() => handleStatusClick(info.id, 'status')}>status: {info.state.status}</span>
                                    {info.state.status === "ok" && <InsertEmoticonIcon style={{fontSize: 20, marginLeft: 10}}/>}
                                    {info.state.status === "offline" && <OfflineBoltIcon style={{fontSize: 20, marginLeft: 10}}/>}
                                    {info.state.status === "error" && <ErrorIcon style={{fontSize: 20, marginLeft: 10}}/>}

                                    {stateMenu && info.id === clickID && <div className={s.onClickMenu}>
                                        <ul>
                                            <li onClick={() => handleStateParameterClicked('ok', info.id, 'status')}>ok</li>
                                            <li onClick={() => handleStateParameterClicked('offline', info.id, 'status')}>offline</li>
                                            <li onClick={() => handleStateParameterClicked('error', info.id, 'status')}>error</li>
                                        </ul>
                                    </div>}
                                </div>
                                <div className={s.stateParams}>
                                    <span onClick={() => handleStatusClick(info.id, 'mood')}>mood: {info.state.mood}</span>
                                    {info.state.mood === "normal" && <InsertEmoticonIcon style={{fontSize: 20, marginLeft: 10}}/>}
                                    {info.state.mood === "tired" && <SentimentVeryDissatisfiedIcon style={{fontSize: 20, marginLeft: 10}}/>}

                                    {moodMenu && info.id === clickID && <div className={s.onClickMenu}>
                                        <ul>
                                            <li onClick={() => handleStateParameterClicked('normal', info.id, 'mood')}>normal</li>
                                            <li onClick={() => handleStateParameterClicked('tired', info.id, 'mood')}>tired</li>
                                        </ul>
                                    </div>}
                                </div>
                                <div className={s.stateParams}>
                                    <span onClick={() => handleStatusClick(info.id, 'mode')}>mode: {info.state.mode}</span>

                                    {modeMenu && info.id === clickID && <div className={s.onClickMenu}>
                                        <ul>
                                            <li onClick={() => handleStateParameterClicked('off', info.id, 'mode')}>off</li>
                                            <li onClick={() => handleStateParameterClicked('manual', info.id, 'mode')}>manual</li>
                                            <li onClick={() => handleStateParameterClicked('auto', info.id, 'mode')}>auto</li>
                                        </ul>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className={`${s.botParams} ${s.last}`}>
                            <p>cfg:</p>
                            <div className={s.cfg}>
                                <DatePickers getDate={(newDate) => handleGetDate(newDate, info.id)} date={info.cfg.timestamp}/>
                            </div>
                        </div>
                    </div>)
                    }
                </div>
            </div>
        </>
    )
}
