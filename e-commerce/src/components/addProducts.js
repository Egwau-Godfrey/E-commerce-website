import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TraderNavbar from "../components/traderNavbar";
// import base64 from "base64-arraybuffer";
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        resolve(reader.result); 
      };
  
      reader.onerror = error => {
        reject(error);
      }; 
    });
  }

const AddProducts = () => {
    const navigate = useNavigate();

    const [newProduct, setnewProduct] = useState({
        ProductName: '',
        QuantityAvailable: '',
        PriceOfEach: '',
        CategoryID: null,
        TraderID: '',
        
        Description: '',
    });

    const [categories, setCategories] = useState([]); // State variable for categories
    const [selectedCategory, setSelectedCategory] = useState(null); // Selected category ID
    const [Picture, setPicture] = useState("")

    // Fetch categories from Django backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/categories'); // Adjust the URL to your API endpoint for categories
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data["categories"]); // Set the categories in state
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCategories(); // Call the fetchCategories function when the component loads
    }, []);

    // Handle category selection
    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);
        setnewProduct({ ...newProduct, CategoryID: selectedCategoryId });
    };

    //pick data from input fields when a change is made to them
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
    
        if (type === 'file') {
            // For file input, use the first file selected by the user
            const file = e.target.files[0];
            setnewProduct({ ...newProduct, [name]: file });
        } else {
            // For other inputs, set the value as a string
            setnewProduct({ ...newProduct, [name]: value });
        }
    };
    
    console.log(Picture)
    // handle image change

    const handleInputImage = async (event) => {
        let picture = event.target.files[0]
        setPicture(picture)
        console.log(Picture)

        app.post('/upload', (req, res) => {
            if (req.files === null) {
            return res.status(400).json({ msg: 'No file uploaded' });
            }
          
            const file = req.files.file;
          
            file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
              if (err) {
                console.error(err);
                return res.status(500).send(err);
              }
          
              res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
            });
          });
    }
    

    const onSubmitForm = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(); // Create a FormData object to send the form data

        // Convert image File to base64 
        const base64 = await convertToBase64(newProduct.Picture);
    
        // Append form fields to the FormData object
        formData.append('ProductName', newProduct.ProductName);
        formData.append('QuantityAvailable', newProduct.QuantityAvailable);
        formData.append('PriceOfEach', newProduct.PriceOfEach);
        formData.append('CategoryID', newProduct.CategoryID);
        formData.append('TraderID', newProduct.TraderID);
        // Send base64 string in request
        formData.append('Picture', base64);
        formData.append('Description', newProduct.Description);
        // formData.append("Picture", imageBase64);

        
    
        try {
            

            //Using the below for loop to loop through all entries, and they are present
            for (const [key, value] of formData.entries()) {
                console.log(key, value)
            }
            
            const response = await fetch('http://localhost:8000/api/trader/addProduct/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: (formData), // Use the FormData object
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data);
    
                // Handle the response data here
    
                // The adding of the product was successful
                if (data['product_added'] === true) {
                    alert("Product added Successfully");
                    console.log('Product added Successfully!');
                } else {
                    alert("Failed to add Product");
                    navigate('/add-product');
                }
            } else {
                console.error('HTTP Error:', response.status);
                console.log("The error is here")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    


      return(
        <>
            <div>
                <TraderNavbar />
            </div>
            <form onSubmit={onSubmitForm} enctype="multipart/form-data">
                <div className='tradercontainer'>
                    <div>
                        <h2>Add product item</h2>
                    </div>
                    <div className='InputContainer'>
                        <div className='traderinputs'>
                            <h3>ProductName: </h3>
                            <input 
                                name='ProductName'
                                className="productName"
                                placeholder='Enter the Product Name'
                                value={newProduct.ProductName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='traderinputs'>
                            <h3>QuantityAvailable: </h3>
                            <input 
                                name='QuantityAvailable'
                                className="quantityAvailable"
                                placeholder='Enter the Quantity Available'
                                value={newProduct.QuantityAvailable}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='traderinputs'>
                            <h3>PriceOfEach: </h3>
                            <input 
                                name='PriceOfEach'
                                className="PriceOfEach"
                                placeholder='Enter the Price of Each'
                                value={newProduct.PriceOfEach}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='traderinputs'>
                            <h3>Category:</h3>
                            <select
                                name='CategoryID'
                                className="CategoryID"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >

                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.CategoryID} value={category.CategoryID}>
                                        {category.CategoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='traderinputs'>
                            <h3>TraderID: </h3>
                            <input 
                                name='TraderID'
                                className="TraderID"
                                placeholder='Enter the Trader ID'
                                value={newProduct.TraderID}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='traderinputs'>
                            <h3>Picture: </h3>
                            <input 
                                name='Picture'
                                className="Picture"
                                type='file'
                                accept='image/*'
                                onChange={handleInputImage}
                            />
                        </div>
                        <div className='traderinputs'>
                            <h3>Description: </h3>
                            <textarea
                                name='Description'
                                className="Description"
                                placeholder='Enter the Description'
                                value={newProduct.Description}
                                onChange={handleInputChange}
                            />
                            
                        </div>
                    </div>


                    <div className='button'>
                        <button type='submit'>Save</button>
                    </div>
                </div>
            </form>
        </>
      );
}


export default AddProducts;