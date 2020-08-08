import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { saveProductList } from "../store/actions/ProductAction";
import {addToCart} from "../store/actions/CartAction";
import Filter from './Filter'; 
import "./Product.css";

const ProductList = (props) => {
  const [productList, setProductList] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [ filters, setFilters ] = useState([])
  const { saveProductList, addToCart } = props;

  const addToCartEvent = (e, product) => {
    console.log(e, product);
    addToCart(product);
  }

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
          setErrorState(true);
        });
    };
    fetchData();
  }, [saveProductList]);

  console.log('filters', filters);

  return (
    <div className="container">
      <div className="filter-container">
          <Filter filters={filters}/>
      </div>
      <div className="product-container">
        {productList &&
          productList.map((product, i) => {
            return (
              <div className="product-labels" key={product.id}>
                <figure className="card card-product">
                  <div className="img-wrap">
                    <img className="img-responsive" src={product.image} />
                  </div>
                  <div className="info-wrap">
                    <h4 className="title">{product.title}</h4>
                    <div className="product-desc">
                      <p className="desc">
                        <b>Color:</b> {product.colour && product.colour.title}
                      </p>
                      <p className="rating">
                        <b>Rating:</b> {product.rating}
                      </p>
                      <p className="price">
                        <b>Rs</b> {product.price && product.price.final_price}
                      </p>
                      <p className="brand">
                        <b>Brand:</b> {product.brand}
                      </p>
                      <button onClick={(e) => addToCartEvent(e, product)}>Add to cart</button>
                    </div>
                  </div>
                </figure>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    console.log('state', state)
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductList: (product) => {
      dispatch(saveProductList(product));
    },
    addToCart: (product) => {
        dispatch(addToCart(product));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
