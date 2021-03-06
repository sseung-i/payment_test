import React from "react";
import styled, { css } from "styled-components";

interface Props {
  name: string;
  isPayType: boolean;
  payTypeClick?: JSX.IntrinsicElements["label"]["onClick"];
  id?: string;
}

const PayTypeBtn = ({ name, isPayType, payTypeClick, id }: Props) => {
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
    border-radius: 5px;
    border: 1px solid orange;
    color: orange;
    ${({ isPayType }) => {
      if (!isPayType) {
        return css`
          background: #eee;
          border: 1px solid #ddd;
          color: #bbb;
          cursor: pointer;
        `;
      }
    }};
  }

  input[type="radio"] {
    display: none;
  }
`;

export default PayTypeBtn;
