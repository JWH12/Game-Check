import React from "react";
import { useNavigate } from "react-router-dom";

const MyHeader = () => {
  const navigate = useNavigate();

  const goBoard = () => {
    navigate("/Board");
  };

  const goIntroduce = () => {
    navigate("/");
  };

  const goMypage = () => {
    navigate("/Mypage");
  };

  return (
    <header>
      <img onClick={goIntroduce} src=".././Logo.png" />
      <div className="header_font">
        <span onClick={goIntroduce}>소개</span>
        <span onClick={goBoard}>게시글</span>
        <span onClick={goMypage}>마이페이지</span>
      </div>
    </header>
  );
};

export default MyHeader;
