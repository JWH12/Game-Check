import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getStringDate } from "../util/date";
import { BoardStateContext } from "../App";

const MyPage = () => {
  const navigate = useNavigate();
  const boardList = useContext(BoardStateContext);
  const [data, setData] = useState(boardList);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Game Check - 마이페이지`;
  }, []);

  useEffect(() => {
    setData(boardList);
  }, [boardList]);

  const [profileImg, setProfileImg] = useState(null);
  const username = useState("Test");
  const signupDate = useState("2024-01-10");

  // 이미지 변경
  const onchangeImg = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setProfileImg(imageUrl);
  };

  // 게시글 정보 호출
  const boardInfo = data.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date,
  }));

  // 게시글 수
  const boardCount = data.length;

  // 페이지 이동
  const goBoard = () => {
    navigate("/board");
  };

  const goDetail = (id) => {
    navigate(`/read/${id}`);
  };

  return (
    <div className="mypage">
      <section className="page_name">
        <div>마이페이지</div>
      </section>

      <section className="mypage_info">
        <section>
          <div>
            <img
              src={profileImg ? profileImg : ".././Logo.png"}
              alt="profileImg"
              className="mypage_img"
            />
          </div>
          <label htmlFor="file">
            <div className="img_change">이미지 변경</div>
          </label>
          <input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            onChange={onchangeImg}
          />
        </section>

        <section className="myInfo">
          <div>닉네임: {username}</div>
          <div>가입날짜: {signupDate}</div>
          <div>작성한 글: {boardCount} 개</div>
        </section>
      </section>

      <section className="mypage_list_info">
        <div className="list_name">내가 작성한 글</div>

        <section>
          <div>
            {boardInfo.map((info, index) => (
              <div
                key={index}
                onClick={() => goDetail(info.id)}
                className="my_board_list"
              >
                <span className="my_board_list_title">
                  게시글 제목 : {info.title}
                </span>
                <span className="my_board_list_date">
                  {getStringDate(new Date(info.date))}
                </span>
              </div>
            ))}
          </div>
        </section>
      </section>

      <div>
        <button className="go_board" onClick={goBoard}>
          목록
        </button>
      </div>
    </div>
  );
};

export default MyPage;
