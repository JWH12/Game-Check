import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardStateContext } from "../App";

import BoardList from "../components/BoardList";

const Board = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Game Check - 게시판`;
  }, []);

  const boardList = useContext(BoardStateContext);

  const [data, setData] = useState(boardList);

  useEffect(() => {
    setData(boardList);
  }, [boardList]);

  return (
    <div>
      <BoardList boardList={data} />
    </div>
  );
};

export default Board;
