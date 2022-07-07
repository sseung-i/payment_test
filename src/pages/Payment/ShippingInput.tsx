import React from "react";
import styled, { css } from "styled-components";
import { ShippingProps } from "../../types/commonTypes";

const ShippingInput = ({
  inputType,
  name,
  id,
  value,
  changeUserData,
  important,
}: ShippingProps) => {
  return (
    <Input isStar={important}>
      <label htmlFor="shipping">{name}</label>
      <input
        data-text={id}
        id="shipping"
        type={inputType}
        defaultValue={value}
        onChange={changeUserData}
      />
    </Input>
  );
};

interface Star {
  isStar?: boolean;
}

const star = css`
  &::before {
    content: "*";
    position: absolute;
    left: -10px;
    width: 10px;
    color: red;
  }
`;

const Input = styled.li<Star>`
  position: relative;
  display: flex;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  label {
    width: 20%;
    min-width: max-content;
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 0.9em;
    word-break: keep-all;
    ${({ isStar }) => isStar && star}
  }

  input {
    padding: 7px 20px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
`;

export default ShippingInput;
