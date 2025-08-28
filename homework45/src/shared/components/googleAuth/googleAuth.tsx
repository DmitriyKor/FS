import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { API_URL } from '../../../store/const';
import { authAxios } from '../../../helpers/authAxios';
import { useDispatch } from 'react-redux';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { setUser } from '../../../store/user';
import { useNavigate } from 'react-router-dom';

//{"web":{"client_id":"701484575722-6hl59r36cvcsf207nvmttuudg0tlen1p.apps.googleusercontent.com","project_id":"delta-s-df","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","javascript_origins":["http://localhost","http://localhost:3000"]}}

const GoogleAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onGoogleSuccess = async (credentialResponse: any) => {
        console.log(credentialResponse);
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
                console.log('Login Failed');
            }}
        />
    );
};
export default GoogleAuth;