import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../components/CartIcon";
import { useState } from "react";
import { useEffect, useRef } from "react";

const Nav = ({ filterProducts, itemCount, memberName }) => {
  //處理手機版nav點選後收起
  const navRef = useRef(null);
  useEffect(() => {
    const handleClick = () => {
      const checkbox = document.getElementById("switch");
      if (checkbox) {
        checkbox.checked = false;
      }
    };

    const navLinks = navRef.current.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);
  return (
    <div className="banner">
      <div className="logo">
        <img src={require("../picture/logo1.jpg")} alt="logo" />
      </div>
      <nav ref={navRef}>
        <input type="checkbox" id="switch" />
        <label for="switch">
          <img src={require("../picture/burger.png")} alt="burger" />
        </label>
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
        <div className="icons">
          <Link to={memberName ? "/member" : "/login"} className="icon">
            <img src={require("../picture/person.png")} alt="person" />
          </Link>
          <Link to="/cart" className="icon">
            {/* <img src={require("../picture/tote-bag.png")} alt="bag" /> */}
            <CartIcon itemCount={itemCount} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
