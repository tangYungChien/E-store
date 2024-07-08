import React from "react";
import { Badge, Space } from "antd";

const CartIcon = ({ itemCount }) => (
  <Space size="middle">
    <Badge count={itemCount}>
      {/* <Avatar shape="square" size="large" icon={<ShoppingCartOutlined />} /> */}
      <img src={require("../picture/tote-bag.png")} alt="bag" />
    </Badge>
  </Space>
);

export default CartIcon;
