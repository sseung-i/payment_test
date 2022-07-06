import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PayBtn = ({ data, amountText }) => {
  const navigate = useNavigate();

  const onClickPayment = () => {
    // 1. 가맹점 식별하기, init 초기화
    const { IMP } = window;
    IMP.init('imp80796153');

    // 2. 결제 창 호출
    const callback = async res => {
      console.log('res', res);
      //3. 결제 후 실행될 로직의 콜백 함수
      const { success, status, imp_uid, merchant_uid, error_msg } = res;

      if (success) {
        //결제 성공 시 axios
        alert('결제가 완료되었습니다.');
        try {
          const data = await axios.post('{endpoint}', {
            imp_uid,
            merchant_uid,
            status,
          });

          // 서버 결제 API 설공시 로직
          navigate('/payment/result', { state: { imp_uid, merchant_uid } });
        } catch (err) {
          console.log('통신 에러 ::', err);
        }
      } else {
        alert('결제 실패 ::', error_msg);
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
