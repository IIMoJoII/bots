import React from 'react';
import bots from '../../bots.json'
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import ErrorIcon from '@material-ui/icons/Error';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import s from './style.module.css'
import DatePickers from "../DatePicker";
import InputField from "../InputField";


export default function BotsPage({deleteUserData}) {
    const [botsArr, setBotsArr] = React.useState(bots.bots)
    const [stateMenu, setStateMenu] = React.useState(false)
    const [moodMenu, setMoodMenu] = React.useState(false)
    const [modeMenu, setModeMenu] = React.useState(false)
    const [clickID, setClickID] = React.useState(null)
    const [addBotModal, setAddBotModal] = React.useState(false)
    const botAddInfo = {
        id: "",
        token: "",
        state: {
            status: "ok",
            mood: "normal",
            mode: "manual"
        },
        cfg: {
            timestamp: ""
        }
    }

    const handleLogOutCallback = React.useCallback(() => {
        deleteUserData()
    }, [deleteUserData])

    const handleOpenAddBot = () => {
        setAddBotModal(!addBotModal)
    }

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
        const index = botsArr.map(e => e.id).indexOf(id);
        let bots = [...botsArr]

        if(info === 'status') {
            bots[index].state.status = parameter
            setStateMenu(!stateMenu)
        } else if(info === 'mood'){
            bots[index].state.mood = parameter
            setMoodMenu(!moodMenu)
        } else if(info === 'mode'){
            bots[index].state.mode = parameter
            setModeMenu(!modeMenu)
        }

        setBotsArr(bots)
    }

    const handleGetDate = (newDate, id) => {
        const index = botsArr.map(e => e.id).indexOf(id);
        botsArr[index].cfg.timestamp = newDate
    }

    const handleGetText = (text, name) => {
        if(name === 'ID')
            botAddInfo.id = text

        if(name === 'Token')
            botAddInfo.token = text
    }

    const handleAddDate = (newDate) => {
        if(newDate !== '')
            botAddInfo.cfg.timestamp = newDate
    }


    const handleAddBot = () => {
        if(botAddInfo.token !== '' && botAddInfo.id !== '' && botAddInfo.cfg.timestamp !== ''){
            setBotsArr(botsArr => [...botsArr, botAddInfo])
            setAddBotModal(!addBotModal)
        }
    }


    const handleDeleteBot = (BotId) => {
        setBotsArr(botsArr.filter(item => item.id !== BotId))
    };


    return(
        <>
            <div className={s.botsPage}>

                {addBotModal && <div className={s.blackScreen}/>}
                {addBotModal && <div className={s.addBotModal}>
                    <InputField getText={handleGetText} name={'ID'}/>
                    <InputField getText={handleGetText} name={'Token'}/>
                    <div className={s.datePicker}>
                        <DatePickers getDate={(newDate) => handleAddDate(newDate)} />
                    </div>
                    <div className={s.modalButtons}>
                        <button onClick={handleAddBot}>Add</button>
                        <button onClick={(text, name) => handleOpenAddBot(text, name)}>Close</button>
                    </div>
                </div>}

                <div className={s.bots}>

                    <div className={s.headers}>
                        <h1>Your Bots</h1>
                        <button className={s.logout} onClick={handleLogOutCallback}>Logout</button>
                    </div>

                    <button onClick={handleOpenAddBot} className={s.addBot}>Add New Bot</button>

                    {botsArr.map((info) => <div key={info.id} className={s.botInfo}>
                        <div className={s.botParams}>
                            <p>ID: {info.id}</p>
                            <button onClick={() => handleDeleteBot(info.id)} className={s.deleteBot}>Delete Bot</button>
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
