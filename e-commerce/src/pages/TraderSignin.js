import React, { useState } from 'react';
import '../login.css';
import { useNavigate, useHistory } from 'react-router-dom';


function TraderSignin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleContinueClick = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/check_username_password/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data); // We Handle the response data here 

                // Redirect to TraderHome page on success
                if(data['user_exists'] == true) {
                    // Save the username in session storage
                    sessionStorage.setItem('username', username);
                    

                    //send the user to the trader home
                    navigate('/trader-home');
                } else {
                    alert("Failed to Login");
                    navigate('/TraderSignin');
                }
                
            } else {
                console.error('HTTP Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const NavigateToTraderSignUp = () => {
        navigate('/TraderSignUp'); // Route to the signup
    };
      

    return (
        <>
            <div className='tradercontainer'>
                <div>
                    <h1>ShopNow</h1>
                </div>
                <div className='LoginContainer'>
                    <div>
                        <div>
                            <h2>Trader Login</h2>
                        </div>
                        
                        <h3>Enter Username</h3>

                        <div className='traderinput'>
                            <input
                                className="usernameinput"
                                placeholder='Enter your Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <h3>Enter Password</h3>
                        <div className='traderinput'>
                            <input
                                type='password'
                                className='passwordinput'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='button'>
                            <button onClick={handleContinueClick}>Continue</button>
                        </div>
                    </div>

                    <div className='button'>
                        <div className='becometext'>
                            <h3><span>Become a Trader</span></h3>
                        </div>
                        <button onClick={NavigateToTraderSignUp}>Become a Trader</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TraderSignin;
