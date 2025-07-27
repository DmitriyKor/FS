import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Alert, FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import { required } from '../../shared/validation';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { API_URL } from '../../store/const';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LoginFormElementsStyle, LoginFormStyle } from '../../shared/styles/styles';
import { setToken } from '../../helpers/auth';
import { setUser } from '../../store/user';

const Register = () => {

    const [loginError, setLoginError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values:any) => {
        try {           
            if (values.password!=values.password2) {
                setLoginError("Passwords are not equal");
                return;
            }
            const {password2, ...valuesToSend} = values;
            const response  : AxiosResponse = await axios.post(API_URL+'/register', valuesToSend);
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
                initialValues={{id:'', name:'', email:'', password:'', startBalance:0, image:''}}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <LoginFormElementsStyle>
                        <Stack sx={{ width: 1/1 }} spacing={2}>

                            <Field name="name" validate={required}>
                                {({ input, meta }) => (
                                    <FormControl size="small">
                                        <TextField
                                            {...input}
                                            size="small"
                                            error={meta.error && meta.touched}
                                            id="outlined-required"
                                            label="Name"
                                        />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </FormControl>
                                )}
                            </Field>

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
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="startBalance">
                                {({ input, meta }) => (
                                    <FormControl size="small">
                                        <TextField
                                            {...input}
                                            type='number'
                                            size="small"
                                            id="outlined-required"
                                            label="Start balance"
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
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="password2" validate={required}>
                                {({ input, meta }) => (
                                    <FormControl>
                                        <TextField
                                            {...input}
                                            type='password'
                                            size="small"
                                            error={meta.error && meta.touched}
                                            id="outlined-required"
                                            label="Re-enter password"
                                        />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </FormControl>
                                )}
                            </Field>

                        </Stack>
                        <Button sx={{mt: 2}} variant="outlined" type='submit'>Register</Button>
                        {loginError!="" && <Alert severity="error">{loginError}</Alert>}
                        <Link to='/login'><Button sx={{mt:2}}>Login</Button></Link> 
                        </LoginFormElementsStyle>
                    </form>
                )}
            />
        </LoginFormStyle>
    )
}

export default Register;