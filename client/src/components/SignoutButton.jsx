import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function SignoutButton() {
    const history = useNavigate();

    function handleClick() {
        Cookies.remove("jwt");
        history("/login"); 
    }

    return (
        <button onClick={handleClick}>
            Signout
        </button>
    );
}
