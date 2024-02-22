import React, {useState} from 'react';
import {useAuth} from "../Auth/AuthContext";
import {callApi, ICallApi} from "../Calls/CallApi";
import Constant from '../Constant/Constant';
import {useNavigate} from "react-router-dom";
interface IAccessProps {
    username?: string;
    password?: string;
}
function Login(){
    const [apiData, setApiData] = useState<IAccessProps>();
    const authContext = useAuth();
    const navigate = useNavigate();
    function handleLogin(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        if (!apiData) return;
        callApi({
                url: Constant.API_URL + Constant.API_LOGIN,
                method: "POST",
                body: JSON.stringify(apiData),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response: Response | undefined) => {
                if (!response)
                    throw new Error("No response");
                if (response.ok)
                    authContext.login();
                if (authContext.isAuthenticated)
                    navigate("/dashboard");
            }).catch((error: any) => {
                console.error(error);
            });
    }
    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>){
        setApiData({
            ...apiData,
            username: event.target.value
        });
    }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        setApiData({
            ...apiData,
            password: event.target.value
        });
    }
    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" onChange={handleUsernameChange} placeholder="Username"/>
                <input type="password" onChange={handlePasswordChange} placeholder="Password"/>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}
export default Login;