import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PaymentData, callbackRes } from "../../../types/commonTypes";

interface Props {
  data: PaymentData;
  amountText: string;
}

const PayBtn = ({ data, amountText }: Props) => {
  const navigate = useNavigate();

  // 2. 결제 창 호출
  const afterPayment = async (res: callbackRes) => {
    //3. 결제 후 실행될 로직의 콜백 함수
    const { success, status, imp_uid, merchant_uid, error_msg } = res;
    console.log(res);

    if (success) {
      //결제 성공 시 axios
      alert("결제가 완료되었습니다.");
      try {
        const data = await axios.post("{endpoint}", {
          imp_uid,
          merchant_uid,
          status,
        });

        console.log("응답 데이터", data);

        // 서버 결제 API 설공시 로직
        navigate("/payment/result", { state: { imp_uid, merchant_uid } });
      } catch (err) {
        console.log("통신 에러 ::", err);
      }
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  const handlePayment = () => {
    // 필수입력값인 연락처의 내용이 없을 때
    if (data.buyer_tel === "") {
      alert("연락처를 입력하세요");
      return;
    }

    // 1. 가맹점 식별하기, init 초기화
    const { IMP }: any = window;
    IMP.init("imp80796153");

    IMP.request_pay(data, afterPayment);
  };

  return <Btn onClick={handlePayment}>{amountText}원 결제하기</Btn>;
};

const Btn = styled.button`
  width: 100%;
  padding: 10px 0;
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
