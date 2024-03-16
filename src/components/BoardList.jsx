import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardItem from "./BoardItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const BoardList = ({ boardList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");
  const [searchBoard, setSearchBoard] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const goNew = () => {
    navigate("/New");
  };

  // 리스트 정렬
  const getProcessedBoardList = () => {
    const compare = (a, b) => {
      const dataA = new Date(a.date);
      const dataB = new Date(b.date);

      if (sortType === "latest") {
        return dataB - dataA;
      } else {
        return dataA - dataB;
      }
    };

    const copyList = Array.isArray(boardList)
      ? JSON.parse(JSON.stringify(boardList))
      : [];

    const filteredList = copyList.filter((item) => {
      return filter === "all" || (item.genres && item.genres.includes(filter));
    });

    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  console.log(sortType);

  // 검색기능
  const handleSearch = () => {
    const filteredList = getProcessedBoardList();

    const result = filteredList.filter((item) =>
      item.title.toLowerCase().includes(searchBoard.toLowerCase())
    );

    setSearchResult(result);

    if (result.length < 1) {
      alert("검색 결과가 없습니다.");
      setSearchBoard("");
    }
  };

  const renderedBoardList =
    searchResult.length > 0 ? searchResult : getProcessedBoardList();

  const originBoardList = [];
  for (let i = 0; i < renderedBoardList.length; i += 3) {
    const row = renderedBoardList.slice(i, i + 3);
    originBoardList.push(row);
  }

  return (
    <div className="boardList">
      <section className="text_search">
        <input
          type="text"
          placeholder=" 검색어를 입력해 주세요"
          value={searchBoard}
          onChange={(e) => setSearchBoard(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : null)}
        />
        <button onClick={handleSearch}>검색</button>
      </section>

      <section className="category_select">
        <div onClick={() => setFilter("all")}>전체</div>
        <div onClick={() => setFilter("액션")}>액션</div>
        <div onClick={() => setFilter("FPS")}>FPS</div>
        <div onClick={() => setFilter("RPG")}>RPG</div>
        <div onClick={() => setFilter("스포츠")}>스포츠</div>

        <ControlMenu
          value={sortType}
          onChange={setSortType}
          optionList={sortOptionList}
        />
      </section>

      <div className="new_board">
        <button onClick={goNew}>글쓰기</button>
      </div>

      {originBoardList.map((row, rowIndex) => (
        <div key={rowIndex} className="board_row">
          {row.map((it) => (
            <BoardItem key={it.id} {...it} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardList;
