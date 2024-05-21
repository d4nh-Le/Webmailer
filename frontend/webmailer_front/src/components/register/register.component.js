import './register.component.css';
import React, { useState } from 'react';
import axios from 'axios'; 

function Register() {
    const [email, setEmail] = useState('');
    const [page, setPage] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email,
            page,
            username
        };

        try {
            const response = await axios.post('http://localhost:8080/registration?email=danhle002@gmail.com&page=test009.com&username=test009');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register-container">
        <div class="instruction-title">Sign Up</div>

        <form className="register-form">
            <div className="input-container">
                <input 
                    placeholder="Email" 
                    className="input-field" 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="input-field" className="input-label">Enter email:</label>
                <span className="input-highlight"></span>
            </div>

            <div className="input-container">
                <input 
                    placeholder="Website Name" 
                    className="input-field" 
                    type="text" 
                    required 
                    value={page} 
                    onChange={(e) => setPage(e.target.value)}
                />
                <label htmlFor="input-field" className="input-label">Enter website name:</label>
                <span className="input-highlight"></span>
            </div>

            <div className="input-container">
                <input 
                    placeholder="Username" 
                    className="input-field" 
                    type="text" 
                    required 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                />
                <label htmlFor="input-field" className="input-label">Enter username:</label>
                <span className="input-highlight"></span>
            </div>

            <div className="input-note">
                <p>*You will receive a verification message in your email.</p>
            </div>

            <div className="input-submit">
                <button type="submit" onSubmit={handleSubmit} className="intro-item button get-started">Submit</button>
            </div>
        </form>
        </div>
    );
}

export default Register;