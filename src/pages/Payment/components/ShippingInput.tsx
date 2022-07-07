import React from "react";
import styled from "styled-components";

interface Props {
  inputType: string;
  name: string;
  id?: string;
  value: string;
  changeUserData?: JSX.IntrinsicElements["input"]["onKeyUp"];
  important?: boolean;
}

const ShippingInput = ({
  inputType,
  name,
  id,
  value,
  changeUserData,
  important,
}: Props) => {
  return (
    <Input>
      {important && <Important>*</Important>}
      <label htmlFor="shipping">{name}</label>
      <input
        data-text={id}
        id="shipping"
        type={inputType}
        defaultValue={value}
        onKeyUp={changeUserData}
      />
    </Input>
  );
};

const Important = styled.span`
  position: absolute;
  left: -10px;
  width: 10px;
  color: red;
`;

const Input = styled.li`
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
  }

  input {
    padding: 7px 20px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 3px;
  }
`;

export default ShippingInput;
