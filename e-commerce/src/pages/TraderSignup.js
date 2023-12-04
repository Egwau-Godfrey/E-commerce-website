import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login.css';

function TraderSignup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
    });

    //pick data from input fields when a change is made to them
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleContinueClick = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/trader/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: (formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data); // We Handle the response data here

                // The signup was successful, you can handle the success case here.
                if(data['success'] == true) {
                    alert("Trader Successfully Signed Up");
                    console.log('Trader signed up successfully!');
                } else {
                    alert("Failed to Signup Trader");
                    navigate('/TraderSignUp');
                }

            } else {
                // Handle error response from the server, e.g., show an error message to the user.
                alert("Error signing up trader");
                console.error('Error signing up trader');
            }
        } catch (error) {
            alert('Error signing up trader', error);
            console.error('Error signing up trader', error);
        }
    }

    return(
        <>
            <div className='tradercontainer'>
                <div>
                    <h1>ShopNow</h1>
                </div>
                <div className='LoginContainer'>
                    <div>
                        <div>
                            <h2>Trader Signup</h2>
                        </div>
                        <h3>First Name</h3>
                        <div className='traderinput'>
                            <input
                                name='firstName'
                                className="fname"
                                placeholder='Enter your First Name'
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h3>Last Name</h3>
                        <div className='traderinput'>
                            <input
                            name='lastName'
                                className="lname"
                                placeholder='Enter your Last Name'
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h3>Email</h3>
                        <div className='traderinput'>
                            <input
                                name='email'
                                className="email"
                                placeholder='Enter your Email'
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h3>Phone</h3>
                        <div className='traderinput'>
                            <input
                                name='phone'
                                className="phone"
                                placeholder='Enter your Phone'
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h3>Enter Username</h3>

                        <div className='traderinput'>
                            <input
                                name='username'
                                className="usernameinput"
                                placeholder='Enter your Username'
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h3>Enter Password</h3>
                        <div className='traderinput'>
                            <input
                                name='password'
                                type='password'
                                className='passwordinput'
                                placeholder='Enter your password'
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='button'>
                            <button onClick={handleContinueClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TraderSignup;