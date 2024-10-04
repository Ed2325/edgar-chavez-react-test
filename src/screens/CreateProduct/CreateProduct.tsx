// src/components/CreateProduct.tsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../slices/productsSlice";
import styles from "./CreateProduct.module.scss";
import { AppDispatch } from "../../store";

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "electronic",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const validateForm = () => {
    const errors = {
      title: "",
      price: "",
      description: "",
      image: "",
    };

    if (!newProduct.title) errors.title = "Title is required";
    if (newProduct.price <= 0) errors.price = "Price must be greater than 0";
    if (!newProduct.description) errors.description = "Description is required";
    if (!newProduct.image) errors.image = "Image URL is required";

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/products");
    if (!validateForm()) return;

    dispatch(createProduct(newProduct));
    setNewProduct({
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "electronic",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.createProductForm}>
      <h2>Create New Product</h2>
      <div>
        <input
          type='text'
          name='title'
          placeholder='Product Title'
          value={newProduct.title}
          onChange={handleInputChange}
        />
        {formErrors.title && (
          <span className={styles.error}>{formErrors.title}</span>
        )}
      </div>
      <div>
        <input
          type='number'
          name='price'
          placeholder='Product Price'
          value={newProduct.price}
          onChange={handleInputChange}
        />
        {formErrors.price && (
          <span className={styles.error}>{formErrors.price}</span>
        )}
      </div>
      <div>
        <input
          type='text'
          name='description'
          placeholder='Product Description'
          value={newProduct.description}
          onChange={handleInputChange}
        />
        {formErrors.description && (
          <span className={styles.error}>{formErrors.description}</span>
        )}
      </div>
      <div>
        <input
          type='text'
          name='image'
          placeholder='Product Image URL'
          value={newProduct.image}
          onChange={handleInputChange}
        />
        {formErrors.image && (
          <span className={styles.error}>{formErrors.image}</span>
        )}
      </div>
      <button type='submit'>Create Product</button>
    </form>
  );
};

export default CreateProduct;
