import { GoogleLogin } from '@react-oauth/google';
import { API_URL } from '../../../store/const';
import { authAxios } from '../../../helpers/authAxios';
import { useDispatch } from 'react-redux';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { setUser } from '../../../store/user';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onGoogleSuccess = async (credentialResponse: any) => {
        try {
            const response: AxiosResponse = await axios.post(API_URL + '/google-auth', credentialResponse);
            if (response.request.status == 200) {
                if (response.data.user.image == '') { response.data.user.image = null }
                authAxios.setToken(response.data.accessToken);
                dispatch(setUser(response.data.user));
                navigate('/');
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
            }
        }
    }

    return (
        <GoogleLogin
            onSuccess={credentialResponse => onGoogleSuccess(credentialResponse)}
            onError={() => {
                //console.log('Login Failed');
            }}
        />
    );
};
export default GoogleAuth;