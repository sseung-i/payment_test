import styled, { css } from "styled-components";

export const PaymentWrap = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 30px;
  box-shadow: 0 0 10px 0 #0002;
  background-color: #fff;

  h2 {
    padding-bottom: 10px;
  }
`;

export const InfoList = styled.ul`
  display: flex;
  padding: 14px 0;
  background: #eee;

  li {
    width: 50%;
    text-align: center;
  }
`;

export const ItemsInfo = styled.section``;

export const Products = styled.ul`
  display: flex;
  padding: 30px 0;
  border-bottom: 2px solid #eee;

  &:not(:last-child) {
    border-bottom: 2px dashed #eee;
  }
`;

export const infoStyle = css`
  display: flex;
  padding: 30px 0;

  h3 {
    width: 20%;
    padding-bottom: 10px;
    color: #666;
  }

  @media (max-width: 600px) {
    flex-direction: column;

    h3 {
      margin-bottom: 10px;
    }
  }
`;

export const BuyerInfo = styled.section`
  ${infoStyle}
  ul {
    display: flex;
    width: 60%;
    flex-direction: column;
    gap: 5px;

    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

export const BtnWrap = styled.section`
  display: flex;
  justify-content: center;
`;

export const PayInfo = styled.section`
  ${infoStyle}
  border-top: 1px dashed #ddd;

  > div {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

export const PayType = styled.ul`
  display: flex;
`;

export const PaymentList = styled.select`
  padding: 10px 20px;
`;
