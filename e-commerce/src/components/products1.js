import { useEffect, useState } from "react";
import ProductViewPage from "./productview";
import '../product-list.css';
import { Link } from "react-router-dom";


const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.productID} className="product-item">
          <Link className="link" to={`/productview/${product.productID}`}> {/**? after the question mark is the parameter being passed */}
            <img src={product.picture} alt={product.productName} />
            <h2>{product.productName}</h2>
            <p>${product.priceOfEach}</p>
            {/* <button onClick={() => handleItemClick(product)}>Add to Cart</button> */}
          </Link>
        </div>
      ))}
    </div>
  );
};
// implement when a product is clicked, it will go to the product view page and display the product info


const Products = () => {
    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(false);

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

    return (
        <>
            <h1>Products</h1>
            <ProductList products={data} />
        </>
    );
    
}

export default Products;