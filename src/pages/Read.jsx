import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BoardDispatchContext, BoardStateContext } from "../App";

import WrapComment from "../components/comment/WrapComment";
import { getStringDate } from "../util/date";

const Read = ({ gameImg }) => {
  const boardList = useContext(BoardStateContext);
  const { onRemove } = useContext(BoardDispatchContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // title name
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Game Check - ${id}게시글`;
  }, [data]);

  // starRating
  const StarDisplay = ({ num }) => {
    const stars = Array.from({ length: num }, (_, index) => (
      <span key={index} className="StarDisplay">
        ★
      </span>
    ));

    return <span>{stars}</span>;
  };

  // img
  useEffect(() => {
    if (gameImg === null && undefined) {
      <img src=".././Logo.png" />;
    } else {
    }
  });

  const convertURLsToLinks = (text) => {
    if (!text) return ""; // Check if text is defined

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
      urlRegex,
      (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
  };

  useEffect(() => {
    if (boardList.length >= 1) {
      const targetBoard = boardList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetBoard) {
        setData(targetBoard);
      }
    }
  }, [id, boardList]);

  // remove
  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(data.id);
      navigate("/board", { replace: true });
    }
  };

  // edit
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  // navigate
  const goboard = () => {
    navigate("/board");
  };

  console.log(data);

  return (
    <div className="Read">
      <section>
        <div className="page_name">
          {data.title}
          <span className="create_date">
            {getStringDate(new Date(data.date))}
          </span>

          <span className="board_btns">
            <button onClick={goEdit}>수정</button>
            <button onClick={handleRemove}>삭제</button>
          </span>
        </div>
      </section>

      <section>
        <img
          className="game_img"
          src={data.gameImg ? data.gameImg : ".././Logo.png"}
          alt="게임 이미지"
        />
      </section>

      <section>
        <div className="star_rating">
          평점 :
          <span>
            <StarDisplay num={data.rating} /> /<span> {data.rating}점 </span>
          </span>
        </div>
      </section>

      <section>
        <div className="post_content">
          <div
            dangerouslySetInnerHTML={{
              __html: convertURLsToLinks(data.content),
            }}
          />
        </div>
      </section>

      <section>
        <div className="post_cotegory">
          {data.genres &&
            Array.from(data.genres).map((char, index) => (
              <span key={index}> #{char}</span>
            ))}
        </div>
      </section>

      <section>
        <div className="list_name">댓글</div>
      </section>

      <WrapComment boardId={data.Id} />

      <section>
        <div>
          <button onClick={goboard} className="go_board">
            목록
          </button>
        </div>
      </section>
    </div>
  );
};

export default Read;
