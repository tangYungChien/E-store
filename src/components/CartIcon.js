import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Avatar, Space } from "antd";

const CartIcon = ({ itemCount }) => (
  <Space size="middle">
    <Badge count={itemCount}>
      {/* <Avatar shape="square" size="large" icon={<ShoppingCartOutlined />} /> */}
      <img src={require("../picture/tote-bag.png")} alt="bag" />
    </Badge>
  </Space>
);

export default CartIcon;
