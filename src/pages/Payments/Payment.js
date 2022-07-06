import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PayBtn from './PayBtn';

const Payment = () => {
  const [data, setData] = useState({
    pg: 'html5_inicis', // PG사
    pay_method: 'card', // 결제수단
    merchant_uid: `imp_${new Date().getTime()}`, // 주문번호
    name: '주문명이 들어갈 자리야', // 주문명
    amount: 10, // 결제금액
    buyer_email: 'example@example', // 구매자 이메일
    buyer_name: '홍길동', // 구매자 이름
    buyer_tel: '010-1234-1234', // 구매자 전화번호
    buyer_addr: '신사동 661-16', // 구매자 주소
    buyer_postcode: '06018', // 구매자 우편번호
  });

  const { amount, name, buyer_name, buyer_tel, buyer_postcode, buyer_addr } =
    data;

  console.log(data.merchant_uid);

  const changeAmountStyle = () => {
    return amount.toLocaleString();
  };

  return (
    <PaymentWrap>
      <h2>주문/결제</h2>
      <ItemsInfo>
        <InfoList>
          <li>상품정보</li>
          <li>가격</li>
        </InfoList>
        <Item>
          <li>{name}</li>
          <li>
            <span>{changeAmountStyle()}</span>원
          </li>
        </Item>
      </ItemsInfo>
      <BuyerInfo>
        <h3>배송지정보</h3>
        <ul>
          <li>{buyer_name}</li>
          <li>{buyer_tel}</li>
          <li>
            ({buyer_postcode}) {buyer_addr}
          </li>
        </ul>
      </BuyerInfo>
      <BtnWrap>
        <PayBtn data={data} amountText={changeAmountStyle()} />
      </BtnWrap>
    </PaymentWrap>
  );
};

const PaymentWrap = styled.div`
  max-width: 800px;
  margin: 100px auto;
  padding: 30px;
  box-shadow: 0 0 10px 0 #0002;
  background-color: #fff;

  h2 {
    padding-bottom: 10px;
  }
`;

const itemListWidth = css`
  li {
    width: 50%;
    text-align: center;
  }
`;

const InfoList = styled.ul`
  display: flex;
  padding: 14px 0;
  background: #eee;

  ${itemListWidth}
`;

const ItemsInfo = styled.section``;

const Item = styled.ul`
  display: flex;
  padding: 30px 0;
  border-bottom: 2px solid #eee;

  ${itemListWidth}

  &:not(:last-child) {
    border-bottom: 2px dashed #eee;
  }
`;

const BuyerInfo = styled.section`
  padding: 30px 0;

  h3 {
    padding-bottom: 10px;
    color: #666;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const BtnWrap = styled.section`
  display: flex;
  justify-content: center;
`;
export default Payment;
