import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { saveProductList } from "../store/actions/ProductAction";
import Search from "./Search";
import "./Header.css";

const Header = (props) => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const { cartItems, saveProductList, userInfo } = props;
  let total = 0;
  cartItems.map(
    (item) =>
      (total +=
        item.product.price && item.product.price.final_price * item.quantity)
  );

  const handleSearch = () => {
    axios
      .get(`https://xebiascart.herokuapp.com/products?title=${searchText}`)
      .then((result) => {
        console.log("sdata", result);
        saveProductList(result && result.data);
      })
      .catch((error) => {
        history.push("/error");
      });
  };

  return (
    <header>
      <div className="row">
        <Link to="/">
          <img
            src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_4ee2f9.png"
            alt="filpkart-logo"
            className="filpkart-logo"
          />
        </Link>

        {userInfo && userInfo.userDetails && userInfo.userDetails.length ? (
          <Search
            cartItems={cartItems}
            setSearchText={setSearchText}
            searchText={searchText}
            handleSearch={handleSearch}
            total={total}
          />
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData.cart,
    userInfo: state.user.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductList: (product) => {
      dispatch(saveProductList(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
