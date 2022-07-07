import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASIC_PGS, SIMPLE_PGS } from "./constants";
import PayBtn from "./components/PayBtn";
import ShippingInput from "./components/ShippingInput";
import PayTypeBtn from "./components/PayTypeBtn";
import Product from "./components/Product";
import * as S from "./Payment.style";

const Payment = () => {
  const [data, setData] = useState({
    pg: "", // PG사
    pay_method: "", // 결제수단
    merchant_uid: `imp_${new Date().getTime()}`, // 주문번호 (고유한 번호 사용해야함으로 Date 사용)
    name: "여름옷 장만 !!", // 주문명
    amount: 10, // 결제금액
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
    console.log("=================================================");
    console.log(e.target.value);
    setData((prev) => ({ ...prev, [dataKey]: e.target.value }));
    console.log(data);
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
    <S.PaymentWrap>
      <h2>주문/결제</h2>
      <S.ItemsInfo>
        <S.InfoList>
          <li>상품정보</li>
          <li>가격</li>
        </S.InfoList>
        <S.Products>
          <Product
            name={name}
            allProduct="헤르미온 원피스(Free), 피크닉 단가라 셔츠(95)"
            price={changeAmountStyle()}
          />
        </S.Products>
      </S.ItemsInfo>
      <S.BuyerInfo>
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
      </S.BuyerInfo>
      <S.PayInfo>
        <h3>결제수단</h3>
        <div>
          <S.PayType>
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
          </S.PayType>
          {payType === "빠른결제" ? (
            <S.PaymentList
              onChange={selectPaymentList}
              defaultValue={SIMPLE_PGS[0].value}
            >
              {SIMPLE_PGS.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </S.PaymentList>
          ) : (
            <S.PaymentList
              onChange={selectPaymentList}
              defaultValue={BASIC_PGS[0].value}
            >
              {BASIC_PGS.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </S.PaymentList>
          )}
        </div>
      </S.PayInfo>
      <S.BtnWrap>
        <PayBtn data={data} amountText={changeAmountStyle()} />
      </S.BtnWrap>
    </S.PaymentWrap>
  );
};

export default Payment;
