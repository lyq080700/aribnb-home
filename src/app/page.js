"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import { Provider } from "react-redux";
import store from "@/store";

import { Divider } from "antd";
export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Provider store={store}>
        <div className="sticky top-0 bg-white">
          <Header isMobile={isMobile} />
          <Divider />
        </div>

        <Container />
      </Provider>
    </div>
  );
}
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // 使用正则表达式检查常见的移动设备用户代理
    const mobileRegex =
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileDevice = mobileRegex.test(userAgent.toLowerCase());

    setIsMobile(isMobileDevice);
  }, []);

  return isMobile;
};
