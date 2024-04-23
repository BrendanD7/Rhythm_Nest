"use client"
import React, { useState } from 'react';
import { InputLabel, FormControl, InputAdornment, Button, IconButton, Input, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { auth } from '../auth';
import { useAuth } from '../context/AuthContext';

enum AuthMode {
    LOGIN = 'LOGIN',
    SIGNUP = 'SIGNUP',
}

const LoginForm = () => {
    const router = useRouter();
    const { logIn, signUp } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [authMode, setAuthMode] = useState(AuthMode.LOGIN);
    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    });

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState(prevState => ({
            ...prevState,
            email: event.target.value
        }));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginState(prevState => ({
            ...prevState,
            password: event.target.value
        }));
    };

    const handleVisibility = () => setShowPassword((show) => !show);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            let result;
            if (authMode === AuthMode.LOGIN) {
                result = await logIn(loginState.email, loginState.password);
            } else {
                result = await signUp(loginState.email, loginState.password);
            }
            console.log("Authentication successful!");
            auth.isLoggedIn = true;
            router.push('/collection');
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while authenticating.");
        }
    };

    const handleToggleMode = () => {
        setAuthMode((mode) => (mode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN));
    };

    return (
        <div className="relative mx-auto flex w-full max-w-[50%] flex-col space-y-2.5 p-4 md:-mt-32 flex items-center justify-center md:h-screen">
            <Paper elevation={3} style={{ margin: "auto", padding: "2rem" }}>
                <Typography variant="h4" align="center" gutterBottom>
                    {authMode === AuthMode.LOGIN ? 'Login' : 'Sign Up'}
                </Typography>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            type="email"
                            value={loginState.email}
                            onChange={handleEmailChange}
                            sx={{ paddingLeft: '8px', paddingBottom: '8px' }}
                        />
                    </FormControl>
                    <FormControl required={true} fullWidth={true}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={loginState.password}
                            onChange={handlePasswordChange}
                            sx={{ paddingLeft: '8px', paddingBottom: '8px' }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button type="submit" variant="contained" color="primary">
                            {authMode === AuthMode.LOGIN ? 'Login' : 'Sign Up'}
                        </Button>
                    </div>
                </form>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <Button onClick={handleToggleMode} variant="contained" color="secondary">
                        {authMode === AuthMode.LOGIN ? 'Sign Up' : 'Back to Login'}
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

export default LoginForm;
