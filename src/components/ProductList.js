import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { saveProductList } from "../store/actions/ProductAction";
import "./Product.css";

const ProductList = (props) => {
  const [productList, setProductList] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const { saveProductList } = props;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`https://xebiascart.herokuapp.com/products `)
        .then((result) => {
          console.log("result", result);
          setProductList(result && result.data);
          saveProductList(result && result.data);
        })
        .catch((error) => {
          setErrorState(true);
        });
    };
    fetchData();
  }, [saveProductList]);

  return (
    <div className="container">
      <div className="filter-container"></div>
      <div className="product-container">
        {productList &&
          productList.map((product, i) => {
            return (
              <div key={product.id}>
                <figure className="card card-product">
                  <div className="img-wrap">
                    <img className="img-responsive" src={product.image} />
                  </div>
                  <figcaption className="info-wrap">
                    <h4 className="title">{product.title}</h4>
                    <p className="desc">
                      Color: {product.colour && product.colour.title}
                    </p>
                  </figcaption>
                  <div className="bottom-wrap">
                    <span className="btn btn-success">Added to cart</span>
                    {/* {this.state.inCart ? (
                      <span className="btn btn-success">Added to cart</span>
                    ) : (
                      <a
                        href="#"
                        
                        className="btn btn-sm btn-primary float-right"
                      >
                        Add to cart
                      </a>
                    )} */}

                    <div className="price-wrap h5">
                      <span className="price-new">
                        {product.price && product.price.final_price}
                      </span>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductList: (product) => {
      dispatch(saveProductList(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
