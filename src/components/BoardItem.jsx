import React from "react";
import { useNavigate } from "react-router-dom";

const BoardItem = ({ id, date, title, gameImg }) => {
  const navigate = useNavigate();

  const startDate = new Date(parseInt(date)).toLocaleString();

  const goDetail = () => {
    navigate(`/read/${id}`);
  };

  return (
    <div className="board_content" onClick={goDetail}>
      <img
        src={gameImg ? gameImg : ".././Logo.png"}
        alt="thumbnail"
        className="content_img"
      />
      <div className="content_name">{title.slice(0, 30)}</div>
    </div>
  );
};

export default React.memo(BoardItem);
