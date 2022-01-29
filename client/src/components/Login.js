import React, { useState } from 'react';
import legoLogo from '../png/Lego-logo.png'

export default function Login() {
    const [email, setEmail] = useState(null); 
    const [password, setPassword] = useState(null);

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const user = {
                email,
                password,
            }

            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(user),
            });
            
            const data = await response.json(); 
            console.log(data.status);
        } catch(err) {
            console.log(err);
        }
    }

    return (
    <div>
        <h1>Create your adult LEGO Account</h1>
        <form onSubmit={loginUser}>
            <label htmlFor="email">Email address</label>
            <input 
                type="email" 
                id='email' 
                name='email' 
                placeholder="example@domain.com" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id='password' 
                name='password' 
                placeholder="********" 
                onChange={(e) => setPassword(e.target.value)}
            />
        </form>
    </div>
  )
}

const accountHeader = () => {
    return (
        <header>
            <img src={legoLogo} alt="lego logo" />
            <h1>Account</h1>
        </header>
    )
}