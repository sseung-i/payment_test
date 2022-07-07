import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BASIC_PGS, SIMPLE_PGS } from "./constants";
import PayBtn from "./components/PayBtn";
import ShippingInput from "./components/ShippingInput";
import PayTypeBtn from "./components/PayTypeBtn";
import Product from "./components/Product";

const Payment = () => {
  const [data, setData] = useState({
    pg: "", // PG사
    pay_method: "", // 결제수단
    merchant_uid: `imp_${new Date().getTime()}`, // 주문번호 (고유한 번호 사용해야함으로 Date 사용)
    name: "여름옷 장만 !!", // 주문명
    amount: 63000, // 결제금액
    buyer_email: "", // 구매자 이메일
    buyer_name: "", // 구매자 이름
    buyer_tel: "", // 구매자 전화번호
    buyer_addr: "", // 구매자 주소
    buyer_postcode: "", // 구매자 우편번호
  });

  const [payType, setPayType] = useState("빠른결제");

  const {
    amount,
    name,
    buyer_name,
    buyer_tel,
    buyer_postcode,
    buyer_addr,
    pay_method,
    buyer_email,
  } = data;

  const getUserData = async () => {
    const userData = await axios.get("/Data/USER.json");
    const { name, email, tel, addr, postcode } = userData.data;
    setData((prev) => ({
      ...prev,
      buyer_name: name,
      buyer_email: email,
      buyer_tel: tel,
      buyer_addr: addr,
      buyer_postcode: postcode,
    }));
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    let nowPg = "";

    switch (payType) {
      case "빠른결제":
        nowPg = SIMPLE_PGS[0].value;
        break;
      case "일반결제":
        nowPg = BASIC_PGS[0].value;
        break;
    }

    setData((prev) => ({ ...prev, pg: nowPg }));
  }, [payType]);

  const changeUserData = (e: any): void => {
    const dataKey = e.target.dataset.text;

    setData((prev) => ({ ...prev, [dataKey]: e.target.value }));
  };

  const changeAmountStyle = () => {
    return amount.toLocaleString();
  };

  const payTypeClick = (e: any): void => {
    const { id, innerText: payTypeName } = e.target;
    setData((prev) => ({ ...prev, pay_method: id }));
    setPayType(payTypeName);
  };

  const selectPaymentList = (e: any): void => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, pg: value }));
  };

  return (
    <PaymentWrap>
      <h2>주문/결제</h2>
      <ItemsInfo>
        <InfoList>
          <li>상품정보</li>
          <li>가격</li>
        </InfoList>
        <Products>
          <Product
            name={name}
            allProduct="헤르미온 원피스(Free), 피크닉 단가라 셔츠(95)"
            price={changeAmountStyle()}
          />
        </Products>
      </ItemsInfo>
      <BuyerInfo>
        <h3>배송지정보</h3>
        <ul>
          <ShippingInput
            inputType="text"
            name="받는이"
            id="buyer_name"
            value={buyer_name}
            changeUserData={changeUserData}
          />
          <ShippingInput
            inputType="text"
            name="연락처"
            id="buyer_tel"
            value={buyer_tel}
            changeUserData={changeUserData}
            important
          />
          <ShippingInput
            inputType="mail"
            name="E-mail"
            id="buyer_email"
            value={buyer_email}
            changeUserData={changeUserData}
          />
          <ShippingInput
            inputType="text"
            name="우편번호"
            id="buyer_postcode"
            value={buyer_postcode}
            changeUserData={changeUserData}
          />
          <ShippingInput
            inputType="text"
            name="주소"
            id="buyer_addr"
            value={buyer_addr}
            changeUserData={changeUserData}
          />
        </ul>
      </BuyerInfo>
      <PayInfo>
        <h3>결제수단</h3>
        <div>
          <PayType>
            <PayTypeBtn
              name="빠른결제"
              isPayType={pay_method === ""}
              payTypeClick={payTypeClick}
            />
            <PayTypeBtn
              name="일반결제"
              isPayType={pay_method === "card"}
              payTypeClick={payTypeClick}
              id="card"
            />
          </PayType>
          {payType === "빠른결제" ? (
            <PaymentList
              onChange={selectPaymentList}
              defaultValue={SIMPLE_PGS[0].value}
            >
              {SIMPLE_PGS.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </PaymentList>
          ) : (
            <PaymentList
              onChange={selectPaymentList}
              defaultValue={BASIC_PGS[0].value}
            >
              {BASIC_PGS.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </PaymentList>
          )}
        </div>
      </PayInfo>
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

const InfoList = styled.ul`
  display: flex;
  padding: 14px 0;
  background: #eee;

  li {
    width: 50%;
    text-align: center;
  }
`;

const ItemsInfo = styled.section``;

const Products = styled.ul`
  display: flex;
  padding: 30px 0;
  border-bottom: 2px solid #eee;

  &:not(:last-child) {
    border-bottom: 2px dashed #eee;
  }
`;

const infoStyle = css`
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

const BuyerInfo = styled.section`
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

const BtnWrap = styled.section`
  display: flex;
  justify-content: center;
`;

const PayInfo = styled.section`
  ${infoStyle}
  border-top: 1px dashed #ddd;

  > div {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

const PayType = styled.ul`
  display: flex;
`;

const PaymentList = styled.select`
  padding: 10px 20px;
`;

export default Payment;
