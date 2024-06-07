import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../components/CartIcon";

const nav = ({ filterProducts, itemCount }) => {
  return (
    <div className="banner">
      <div className="logo">
        <img src={require("../picture/logo1.jpg")} alt="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="home" onClick={() => filterProducts("all")}>
              首頁
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => filterProducts("ring")}>
              戒指
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => filterProducts("earring")}>
              耳環
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => filterProducts("necklace")}>
              項鍊
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => filterProducts("clip")}>
              鯊魚夾
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => filterProducts("hair")}>
              髮飾
            </Link>
          </li>
          <li>
            <Link to="/about">關於品牌</Link>
          </li>
        </ul>
      </nav>
      <div className="icons">
        <Link to="/login" className="icon">
          <img src={require("../picture/person.png")} alt="person" />
        </Link>
        <Link to="/cart" className="icon">
          {/* <img src={require("../picture/tote-bag.png")} alt="bag" /> */}
          <CartIcon itemCount={itemCount} />
        </Link>
      </div>
    </div>
  );
};

export default nav;
