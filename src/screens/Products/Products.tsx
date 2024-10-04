import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCurrentPage } from "../../slices/productsSlice";
import { RootState, AppDispatch } from "../../store";
import { Link } from "react-router-dom";
import styles from "./Products.module.scss";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, currentPage, totalProducts } = useSelector(
    (state: RootState) => state.products
  );

  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 5;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => a.price - b.price
  );
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return <div>No products available.</div>;

  return (
    <div className={styles.productsWrapper}>
      <header>
        <nav className={styles.navBar}>
          <h1>Filter</h1>
          <input
            type='text'
            placeholder='Filter...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button>
            <Link to={"/createProduct"}>Add New Product</Link>
          </button>
        </nav>
      </header>

      <table className={styles.productsTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={() => dispatch(setCurrentPage(currentPage))}>Title</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
              </td>
              <td>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
              </td>
              <td>${product.price}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={index + 1 === currentPage}
            className={index + 1 === currentPage ? styles.active : ""}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
