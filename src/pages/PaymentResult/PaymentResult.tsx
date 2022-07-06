import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentResult = () => {
  const { state } = useLocation();
  const { imp_uid, merchant_uid }: any = state;

  const getData = async () => {
    // 인증 토큰 발급 받기
    const getToken = await axios.post("https://api.iamport.kr/users/getToken", {
      imp_key: "7880042629425375", // REST API키
      imp_secret:
        "b5cc3737b3db060ae2b5f715add5ea3ade838e4953f63094f7afc8f3ddc22e73c02f724b32fd1d3d", // REST API Secret
    });

    const { access_token } = getToken.data.response; // 인증 토큰

    const getData = await axios.get(
      `https://api.iamport.kr/payments/${imp_uid}`,
      {
        headers: { Authorization: access_token },
      }
    );

    // 조회한 결제 정보
    const paymentData = getData.data.response;

    //결제 검증 과정
    console.log("페이먼트 데이터 사용해서 검증?", paymentData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>결과창</h1>
      <p>{imp_uid}</p>
      <p>{merchant_uid}</p>
    </div>
  );
};

export default PaymentResult;
