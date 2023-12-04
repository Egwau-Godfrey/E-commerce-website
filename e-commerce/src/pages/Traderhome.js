import TraderNavbar from "../components/traderNavbar";
import TraderData from "../components/traderData";

function Traderhome() {
    const storedUsername = sessionStorage.getItem('username');

    
    return(
        <>
            <div>
                <TraderNavbar />
            </div>
            <div>
                <TraderData username={storedUsername}/>
            </div>
        </>
    );
}

export default Traderhome;