import React from "react";

const Product = (props) => {
  const { product, addToCartEvent, checkInCart } = props;
  
  let productTitle = product.title;
  let trimFlag = false;
  if(product.title && product.title.length > 30) {
    productTitle = product.title.substring(0,30);
    trimFlag = true;
  } else {
    trimFlag = false;
  }
  return (
    <div className="product-labels" key={product.id}>
      <figure className="card card-product">
        <div className="img-wrap">
          <img
            className="img-responsive"
            alt={product.title}
            src={product.image}
          />
        </div>
        <div className="info-wrap">
          <h4 className="title">{productTitle}{trimFlag ? '..' : ''}</h4>
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
              <b>Brand:</b> {product.brand.substring(0,10)}
            </p>
            {!checkInCart ? (
              <button className="add-cart" onClick={(e) => addToCartEvent(e, product)}>
                Add to cart
              </button>
            ) : (
              <button className="added-cart">Added to cart</button>
            )}
          </div>
        </div>
      </figure>
    </div>
  );
};

export default React.memo(Product);
