import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import { required } from '../../shared/validation';

export const Login = () => {
    
    const onSubmit = ()=> {

    }

    console.log('Login')
       
    return (
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
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
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
                    </Stack>
                    <Button variant="outlined" type='submit'>Login</Button>
                </form>
            )}
        />
    )
}