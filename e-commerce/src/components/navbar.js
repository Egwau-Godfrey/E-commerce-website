import '../App.css'
import Cart from '../icons/cart.svg'
import Help from '../icons/help.svg'
import User from '../icons/user.svg'

function navbar() {
    return(
        <nav className='NavBar'>
            <ul className='navList'>
                <li><a href='/'>Home</a></li>
                <li>
                    <ul className='SearchBarList'>
                        <li><input type="text" className="searchinput" placeholder="   Search products, brands and categories"/></li>
                        <li><button className='searchButton'>SEARCH</button></li>
                    </ul>
                </li>
                <li>
                    <div className='dropdown'>
                        <button className='dropbtn'><img src={User} alt='Account' /> Account</button>
                        <div className='dropdown-content'>
                            <a href='/UserSignin'>User Sign in</a>
                            <a href='/TraderSignin'>Trader Sign in</a>
                            <a href='http://localhost:8000/admin/login/?next=/admin/'>Admin Sign in</a>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='dropdown'>
                        <button className='dropbtn'><img src={Help} alt='help' /> Help</button>
                        <div className='dropdown-content'>
                            <a>Place and Track Order</a>
                            <a>Order Cancellation</a>
                            <a>Returns and Refunds</a>
                            <a>Payments and Accounts</a>
                            <a>Help Center</a>
                        </div>
                    </div>
                </li>
                <li><a href='/cart'><img src={Cart} alt='cart'/> Cart</a></li>
            </ul>
        </nav>
    );
}

export default navbar;