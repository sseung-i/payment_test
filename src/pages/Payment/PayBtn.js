import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PayBtn = ({ data, amountText }) => {
  const { merchant_uid, amount } = data;

  const onClickPayment = () => {
    // 1. 가맹점 식별하기
    const { IMP } = window;
    IMP.init('imp80796153');

    // 2. 결제 창 호출
    const callback = res => {
      console.log('res', res);
      //3. 결제 후 실행될 로직의 콜백 함수
      const { success, imp_uid, merchant_uid, error_msg } = res;

      if (success) {
        //결제 성공 시 jQuery로 HTTP 요청
        alert('결제 성공');
        axios
          .post('/', {
            merchant_uid,
            amount,
          })
          .then(data => console.log('성공이다얏::', data));
      } else {
        alert(`결제 실패:: ${error_msg}`);
      }
    };

    IMP.request_pay(data, callback);
  };

  return <Btn onClick={onClickPayment}>{amountText}원 결제하기</Btn>;
};

const Btn = styled.button`
  padding: 10px 30px;
  border: 0;
  border-radius: 7px;
  font-size: 1.2rem;
  color: #fff;
  background-color: orange;

  :hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

export default PayBtn;
