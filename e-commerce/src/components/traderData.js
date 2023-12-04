import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../trader.css';

const TraderData = ({ username }) => {
  const [userProducts, setUserProducts] = useState([]);
  const [editedProducts, setEditedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/trader/details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          // Handle the response data here
          const products = data.user_data.products;
          setUserProducts(products);
          setEditedProducts([...products]); // Clone products for editing
        } else {
          console.error('HTTP Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [username]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...editedProducts];
    updatedProducts[index][name] = value;
    setEditedProducts(updatedProducts);
  };

  const handleSaveChanges = async () => {
    try {
      // Send editedProducts to the server to save changes
      console.log('Saving changes:', editedProducts);
      
      const response = await fetch('http://localhost:8000/api/trader/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, editedProducts }),
      });

      if (response.ok) {
        console.log('Changes saved successfully');
      } else {
        console.error('HTTP Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleAddProduct = () => {
	navigate("/add-product")
  }

  return (
    <div className='Overrall'>
      <div className="container">
        <Table className="table" striped bordered hover>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity Available</th>
              <th>Price Each</th>
              <th>Category</th>
              <th>Trader ID</th>
              <th>Image</th>
              <th>Description</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {editedProducts.map((product, index) => (
              <tr key={product.productID}>
                <td>{product.productID}</td>
                <td>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={product.productName}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="QuantityAvailable"
                    value={product.QuantityAvailable}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="priceOfEach"
                    value={product.priceOfEach}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td>{product.CategoryID.categoryName}</td>
                <td>{product.traderID}</td>
                <td>
                  {product.hasImage ? (
                    <div>
						<img
							src={`data:image/jpeg;base64,${product.imageBase64}`}
							alt={product.productName}
							width="100"
                      	/>
						<input
							type='file'
							accept='image/*'
							onChange={(event) => handleInputChange(index, event)}
                      	/>
                    </div>
                  ) : (
                    <Form.Control
                      type="file"
                      name="picture"
                      accept="image/*"
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  )}
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="Description"
                    value={product.Description}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                {/* Add more table cells for other product fields */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button className='saveChanges' variant="primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
      <Button className='addProduct' onClick={handleAddProduct}>
        Add Product
      </Button>
    </div>
  );
};

export default TraderData;
