import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState and useEffect
import '../product-list.css';
import bCart from "../icons/bCart.svg";

function Products({ data }) {
    const { productID } = useParams();
    const [product, setProduct] = useState(null); // State to store the selected product
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if data exists and is not empty
        if (data && data.length > 0) {
            console.log("ProductViewPagescool", data);
            // Filter the data array to find the product with the matching ID
            const selectedProduct = data.find((item) => item.productID === Number(productID));

            // Set the selected product in the state
            setProduct(selectedProduct);

            // Set loading to false
            setLoading(false);
        } else {
            // Handle the case where data is not available yet (e.g., still loading)
            setLoading(true);
        }
    }, [data, productID]); // Execute the effect whenever productID changes

    // Rest of your component logic here

    return (
        <>
            <div>
                <Navbar />
            </div>

            <h1>Product Page</h1>

            {loading ? (
                <p>Loading...</p>
            ) : product ? (
                <>
                    <div className="productViewItem">
                        <div className="productView">
                            <div className="image">
                                <img src={product.picture} alt={product.productName} />
                            </div>
                            <div className="productname">
                                <h2>{product.productName}</h2>
                                <p className="productdescription">
                                    {product.Description}
                                </p>
                                <div className="productprice">
                                    <p>${product.priceOfEach}</p>

                                    <button><img src={bCart} alt='cart'/> <b>ADD TO CART</b></button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    {/* Add other product details here */}
                </>
            ) : (
                <p>Product not found</p>
            )}
        </>
    );
}

const Productviewpage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    var componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8000/api/products/");
                if (componentMounted) {
                    const responseData = await response.json();
                    setData(responseData);
                    setLoading(false);

                    // Print the fetched data to the console
                    console.log("Fetched data:", responseData);
                }
            } catch (fetcherror) {
                console.error("Error fetching data:", fetcherror);
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    // Render the Productviewpage component
    return (
        <div>
            {console.log("Product", data)}
            <Products data={data} /> {/* Pass data as a prop */}
        </div>
    );
}


export default Productviewpage;
