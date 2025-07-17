import { useNavigate } from "react-router-dom";
import { removeToken } from "../../helpers/auth"
import { useEffect } from "react";

export const Logout = ()=> {
    const navigate = useNavigate();

    useEffect(() => {
        removeToken();
        navigate('/login');
    }, []);

    return (
        <>
        </>
    )
}