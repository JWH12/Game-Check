import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BoardStateContext } from "../App.jsx";
import BoardEditor from "../components/BoardEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const boardList = useContext(BoardStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Game Check - 게시글수정`;
  }, []);

  useEffect(() => {
    if (boardList.length >= 1) {
      const targetBoard = boardList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetBoard) {
        setOriginData(targetBoard);
      } 
    }
  }, [boardList, id, navigate]);

  return (
    <div>
      {originData && <BoardEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
