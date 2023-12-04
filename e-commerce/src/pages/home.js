import Navbar from "../components/navbar"; 
import ProductList from "../components/products1";

function homepage() {
    return(
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <ProductList />
            </div>
        </>
    );
}

export default homepage;