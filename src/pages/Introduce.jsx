import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { useNavigate } from "react-router-dom";

import Dots from "../components/Dots";

import ".././Introduce.modul.css";

const IntoBody = styled.div`
  margin: 0;
  overflow-y: hidden;
`;

function Introduce() {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Game Check - 소개`;
  }, []);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();

      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else {
          console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else {
          console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;

    outerDivRefCurrent.addEventListener("wheel", wheelHandler);

    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  const goCommu = () => {
    navigate("/Board");
  };

  return (
    <IntoBody>
      <div id="introduce-wrapper" ref={outerDivRef} className="Introduce">
        <Dots currentPage={currentPage} />

        <div className="inner game_img_1">
          <img src=".././search.jpg" />
          <div className="intro_text">어떤 게임을 할지 고민되시나요?</div>
        </div>

        <div className="divider"></div>

        <div className="inner game_img_2">
          <img src=".././commu.jpg" />
          <div className="intro_text">
            Game Chek을 통해 게임을 공유해보세요!
          </div>
        </div>

        <div className="divider"></div>

        <div className="inner game_img_3">
          <img src=".././game3.jpg" />
          <div className="intro_text">당신의 게임을 찾아보세요!</div>
          <div className="intro_btn">
            <button onClick={goCommu}>게임 찾으러 가기 →</button>
          </div>
        </div>
      </div>
    </IntoBody>
  );
}

export default Introduce;
