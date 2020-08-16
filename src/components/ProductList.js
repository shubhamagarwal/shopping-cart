import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {  useHistory } from 'react-router-dom';
import { saveProductList, fetchProducts } from "../store/actions/ProductAction";
import {addToCart} from "../store/actions/CartAction";
import Filter from './Filter'; 
import Product from './Product';
import "./Product.css";

const ProductList = (props) => {
  const [productList, setProductList] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [filterFlag, setFilterFlag] = useState(false)
  const [ filters, setFilters ] = useState([])
  const { saveProductList, addToCart, productData, cartItems, fetchProducts } = props;
  const history = useHistory();

  const addToCartEvent = (e, product) => {
    addToCart(product);
  }

  const resetFilter = () => {
    saveProductList(productList);
    setFilterFlag(false)
  }

  const handleFilter = React.useCallback((e, type) => {
      let url = 'https://xebiascart.herokuapp.com/products' 
      if(e.target.checked && type === 'brand') {
        url = `${url}?brand=${e.target.value}`
      }
      axios
      .get(url)
      .then((result) => {
        setFilterFlag(true)
        saveProductList(result && result.data);
      })
      .catch((error) => {
        history.push("/error");
      });
  },[history, saveProductList])

  useEffect(() => {
    const fetchData = async () => {
        await axios.all([
            axios.get('https://xebiascart.herokuapp.com/products'),
            axios.get(`https://xebiascart.herokuapp.com/filters`),
          ])
        .then((result) => {
          
          setProductList(result && result[0] && result[0].data);
          setFilters(result && result[1] && result[1].data)
          saveProductList(result && result[0] && result[0].data);
          
        })
        .catch((error) => {
          console.log('error', error)
          setErrorState(true);
          history.push("/error");
        });
    };
    fetchData();
  }, [saveProductList, history]);

  return (
    <div className="container">
      <div className="filter-container">
          <Filter filters={filters} resetFilter={resetFilter} handleFilter={handleFilter} />
      </div>
      <div className="product-container">
        {productData && productData.length ?
          (productData.map(product => {
            return (
              <Product product={product} addToCartEvent={addToCartEvent} key={product.id} checkInCart={cartItems.length && cartItems.filter(item => item.product.id === product.id).length > 0 } />
            );
          })) : <div className="no-result">{filterFlag ? 'No result found' : 'Loading...' }</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
      productData : state.productList.products,
      cartItems: state.cartData.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductList: (product) => {
      dispatch(saveProductList(product));
    },
    addToCart: (product) => {
        dispatch(addToCart(product));
    },
    fetchProducts: () => dispatch(fetchProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
