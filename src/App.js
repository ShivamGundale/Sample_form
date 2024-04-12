import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8080');
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone_no: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(formData);
  };

  return (
    <div className="App">
      <div>
        <h1>Product Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <h2>Name:</h2>
            <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
          </label>
          <br />

          <label>
            <h2>Email:</h2>
            <textarea name="Email" value={formData.Email} onChange={handleChange} />
          </label>
          <br />

          <label>
            <h2>Phone No:</h2>
            <input type="text" name="Phone_no" value={formData.Phone_no} onChange={handleChange} />
          </label>
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
