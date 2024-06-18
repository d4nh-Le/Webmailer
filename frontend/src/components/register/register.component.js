import './register.component.css';
import { useState } from 'react';
import axios from 'axios'; 

function Register() {
    const [email, setEmail] = useState('');
    const [page, setPage] = useState('');
    const [username, setUsername] = useState('');
    const [resNotification, setResNotification] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !page || !username) {
            setResNotification('Please fill in all fields before submit.');
            setIsError(true);
            return;
        }

        const data = {
            email,
            page,
            username
        };

        try {
            const response = await axios.get('http://w3bmailer.site/registration', { params: data });
            // const response = await axios.get('http://localhost:8080/registration', { params: data }); // for local testing

            if (response.status === 200) {
                setResNotification('Successfully registered! Check your email for verification.');
                setIsError(false);
            } else {
                 setResNotification('An error occurred.');
                 setIsError(true);
}
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="register-container">
        <div class="instruction-title" id="register-container-title">Sign Up</div>

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

            <div className={`input-notification ${isError ? 'error' : ''}`}>
            <p>{resNotification}</p>
            </div>

            <div className="input-submit">
                <button type="button" onClick={handleSubmit} className="intro-item button get-started"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="#ffffff" d="M32 13.08v13.63l-7.36-7.36l-1.41 1.41L30.46 28H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0l8.83-8.78a7.44 7.44 0 0 1-2-.85l-8.26 8.21L5.31 8h17.5a7.49 7.49 0 0 1-.31-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V12.2a7.45 7.45 0 0 1-2 .88" class="clr-i-outline--badged clr-i-outline-path-1--badged"/><circle cx="30" cy="5.86" r="5" fill="#ffffff" class="clr-i-outline--badged clr-i-outline-path-2--badged clr-i-badge"/><path fill="none" d="M0 0h36v36H0z"/></svg>Submit</button>
            </div>
        </form>
        </div>
    );
}

export default Register;