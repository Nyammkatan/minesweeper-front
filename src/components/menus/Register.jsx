import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, CircularProgress, TextField } from '@mui/material';
import { TokenContext } from '../../storage/tokenStorage';
import { login, register } from '../../utils/requests';
import { GAME_STATE_MENU_LOGIN, GAME_STATE_RUNNING, GAME_STATE_START_OR_LOAD, STATE_AUTHORIZED } from '../../utils/constants';

const Register = ({setUserAuthorizationState, setMenuState}) => {

    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);

    const token = useContext(TokenContext);

    function handleSubmit(e){
        e.preventDefault();
        setError(false);
        if (username && password){
            setLoading(true);
            register(username, password).then(r => {
                login(username, password).then(r => {
                    if (r.data.access_token){
                        setLoading(false);
                        token.setValue(r.data.access_token);
                        setUserAuthorizationState(STATE_AUTHORIZED);
                        setMenuState(GAME_STATE_START_OR_LOAD);
                    } else {
                        setError("Something went wrong!");
                        setLoading(false);
                    }
                }).catch(e => {
                    setError("Something went wrong!");
                    setLoading(false);
                });
            }).catch(e => {
                setError("User with such name already exists!");
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

    function goToLogin(){
        setMenuState(GAME_STATE_MENU_LOGIN);
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
                {!loading && <Button type="submit">Sign Up</Button>}
                {loading && <CircularProgress />}
                <div>
                    <span className='link' onClick={goToLogin}>Already have an account? Sign In</span>
                </div>
                <div style={{color: 'red', marginTop: 10}}>
                    {error}
                </div>
            </Box>
        </div>
    );

};

export default Register;