import '../trader.css'

function traderNavbar() {
    const storedUsername = sessionStorage.getItem('username');

    
    return(
        <>
            <nav>
                <ol className="traderBar">
                    <ul className="traderPageTitle">
                        <li><a href='/trader-home'>Trader Administrator</a></li>
                    </ul>

                    <ul className="Logoutdetails">
                        <li>Welcome {storedUsername}</li>
                        
                        <li><button className='logoutbtn'>LOG OUT</button></li>
                    </ul>
                </ol>
            </nav>
        </>
    );
}

export default traderNavbar;