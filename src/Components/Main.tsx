import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Login";
import {PrivateRoute} from "../Auth/PrivateRoute";
import {AuthProvider, } from "../Auth/AuthContext";
import Home from "./Home";

function Main() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                        <Route path="/"  element={<Login /> }/>
                    <Route
                        path="/dashboard"
                        element={<PrivateRoute children={<Home />}/>}
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Main;