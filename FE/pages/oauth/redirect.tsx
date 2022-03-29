/*
구글로그인 redirect 페이지
구글로그인 후 redirect되는 페이지이다.
localStorage에 토큰을 저장하고, 홈으로 이동한다.
@author user$
@version 1.0.0
생성일 date$
마지막 수정일 lastdate$
*/

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";

const Redirect: NextPage = (props) => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("token", router.query.token as string);
    router.replace("/home");
  }, [router.isReady]);
  return <></>;
};

export default Redirect;
