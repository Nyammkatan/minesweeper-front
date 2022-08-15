import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, CircularProgress, TextField } from '@mui/material';
import { TokenContext } from '../../storage/tokenStorage';
import { getSaveGame, login } from '../../utils/requests';
import { GAME_STATE_MENU_REGISTER, GAME_STATE_START_OR_LOAD, STATE_AUTHORIZED } from '../../utils/constants';

const Login = ({setUserAuthorizationState, setMenuState, setSaveGameExists}) => {

    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);

    const token = useContext(TokenContext);

    function moveToPlayerMenu(tokenReceived){
        token.setValue(tokenReceived);
        setLoading(false);
        setUserAuthorizationState(STATE_AUTHORIZED);
        setMenuState(GAME_STATE_START_OR_LOAD);
    }

    function handleSubmit(e){
        e.preventDefault();
        setError(false);
        if (username && password){
            setLoading(true);
            login(username, password).then(r => {
                if (r.data.access_token){
                    getSaveGame(r.data.access_token).then(r => {
                        setSaveGameExists(r.data);
                        moveToPlayerMenu(r.data.access_token);
                    }).finally(() => {
                        moveToPlayerMenu(r.data.access_token);
                    });
                } else {
                    setError("Something went wrong!");
                    setLoading(false);
                }
            }).catch(e => {
                setError("No user with such name or password exists!");
                setLoading(false);
            });
        }
    }

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function goToRegistration(){
        setMenuState(GAME_STATE_MENU_REGISTER);
    }

    return (
        <div className='game-form'>
            <Box component="form" onSubmit={handleSubmit} style={{width: 250, minHeight: 250}}>
                <TextField
                    margin="normal"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    size="small"
                    fullWidth
                    value={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    size="small"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                />
                {!loading && <Button type="submit">Sign in</Button>}
                {loading && <CircularProgress />}
                <div>
                    <span className='link' onClick={goToRegistration}>Don't have an account? Sign Up</span>
                </div>
                <div style={{color: 'red', marginTop: 10}}>
                    {error}
                </div>
            </Box>
        </div>
    );

};

export default Login;