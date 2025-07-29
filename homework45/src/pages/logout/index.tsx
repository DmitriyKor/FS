import { useNavigate } from "react-router-dom";
import { removeToken } from "../../helpers/auth"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/user";

const Logout = ()=> {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        removeToken();
        dispatch(resetUser());
        navigate('/');
    }, []);

    return (
        <>
        </>
    )
}

export default Logout;