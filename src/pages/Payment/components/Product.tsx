import React from "react";
import styled from "styled-components";

interface Props {
  name: string;
  price: string;
  allProduct?: string;
}

const Product = ({ name, price, allProduct }: Props) => {
  return (
    <Item>
      <div className="info">
        <h4>{name}</h4>
        <p>{allProduct}</p>
      </div>
      <div className="price">{price}</div>
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  width: 100%;

  div {
    width: 50%;

    > h4 {
      font-weight: 500;
    }

    > p {
      margin-top: 5px;
      font-size: 0.8em;
      color: #666;
    }
  }

  .info {
    padding-left: 30px;
  }

  .price {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Product;
