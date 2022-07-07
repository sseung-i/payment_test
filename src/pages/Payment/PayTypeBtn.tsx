import React from "react";
import styled, { css } from "styled-components";
import { PayBtnProps } from "../../types/commonTypes";

const PayTypeBtn = ({ name, isPayType, payTypeClick, id }: PayBtnProps) => {
  return (
    <Btn isPayType={isPayType}>
      <input name="payType" id="payType" type="radio" />
      <label htmlFor="payType" id={id} onClick={payTypeClick}>
        {name}
      </label>
    </Btn>
  );
};

interface BgClor {
  isPayType: boolean;
}

const Btn = styled.li<BgClor>`
  &:not(:last-child) {
    margin-right: 20px;
  }

  label {
    display: inline-block;
    padding: 10px 30px;
    border: 1px solid #ddd;
    border-radius: 5px;
    ${({ isPayType }) => {
      if (!isPayType) {
        return css`
          background: #eee;
          color: #bbb;
          cursor: pointer;
        `;
      }
    }}
  }

  input[type="radio"] {
    display: none;
  }
`;

export default PayTypeBtn;
