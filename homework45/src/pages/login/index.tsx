import { useState } from 'react';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { Form, Field } from 'react-final-form';
import Button from '@mui/material/Button';
import { Alert, FormControl, Stack, TextField } from '@mui/material';
import { required } from '../../shared/validation';
import { API_URL } from '../../store/const';
import { setUser } from '../../store/user';
import { LoginFormElementsStyle, LoginFormStyle, LoginStack, StyledRouterLink } from '../../shared/styles/styles';
import { Link, useNavigate } from 'react-router-dom';
import { setToken, useToken } from '../../helpers/auth';

export const Login = () => {

    const [loginError, setLoginError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values:any) => {
        try {
            const response  : AxiosResponse = await axios.post(API_URL+'/login', values);
            if (response.request.status==200) {                
                if (response.data.user.image=='') {response.data.user.image=null}
                setToken(response.data.accessToken);
                dispatch(setUser(response.data.user));    
                setLoginError("");
                navigate('/');
            } else setLoginError(response.request.statusText);
        } catch (e) {
            setLoginError(e.message);
        }
    }

    return (
        <LoginFormStyle>
            <Form
                onSubmit={onSubmit}
                initialValues={{email:'', password:''}}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <LoginFormElementsStyle>
                        <Stack sx={{ width: 1/1 }} spacing={2}>
                            <Field name="email" validate={required}>
                                {({ input, meta }) => (
                                    <FormControl size="small">
                                        <TextField
                                            {...input}
                                            size="small"
                                            error={meta.error && meta.touched}
                                            label="Email"
                                        />
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="password" validate={required}>
                                {({ input, meta }) => (
                                    <FormControl>
                                        <TextField
                                            {...input}
                                            type='password'
                                            size="small"
                                            error={meta.error && meta.touched}
                                            label="Password"
                                        />
                                    </FormControl>
                                )}
                            </Field>
                        </Stack>
                        <Button sx={{mt:2}} variant="outlined" type='submit'>Login</Button>
                        {loginError!="" && <Alert severity="error">{loginError}</Alert>}
                        <Link to='/register'><Button sx={{mt:2}}>Register</Button></Link> 
                        </LoginFormElementsStyle>
                    </form>
                )}
            />
        </LoginFormStyle>
    )
}