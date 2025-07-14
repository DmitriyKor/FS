import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Alert, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import { required } from '../../shared/validation';
import { SideBar } from '../../shared/components/sideBar';
import { LoginLayout, LoginFormStyle } from './index.styles';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { API_URL } from '../../store/const';
import { useState } from 'react';

export const Login = () => {

    const [loginError, setLoginError] = useState('');

    const onSubmit = async (values:any) => {
        try {
            console.log(values);
            const response  : AxiosResponse = await axios(API_URL+'/login', values);
            console.log(response); 

        } catch (e) {
            setLoginError(e.message);
        }

    }

    return (
        <LoginFormStyle>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <Field name="email" validate={required}>
                                {({ input, meta }) => (
                                    <FormControl size="small">
                                        <TextField
                                            {...input}
                                            size="small"
                                            error={meta.error && meta.touched}
                                            id="outlined-required"
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
                                            id="outlined-required"
                                            label="Password"
                                        />
                                    </FormControl>
                                )}
                            </Field>
                        </Stack>
                        <Button sx={{mt: 2}} variant="outlined" type='submit'>Login</Button>
                        {loginError!="" && <Alert severity="error">{loginError}</Alert>}
                    </form>
                )}
            />
        </LoginFormStyle>
    )
}