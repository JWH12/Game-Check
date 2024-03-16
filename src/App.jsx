import React, { useEffect, useRef, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Introduce from "./pages/Introduce.jsx";
import Board from "./pages/Board.jsx";
import New from "./pages/New.jsx";
import Read from "./pages/Read.jsx";
import Edit from "./pages/Edit.jsx";
import Mypage from "./pages/MyPage.jsx";
import MyHeader from "./components/Myheader.jsx";
import MyFooter from "./components/MyFooter.jsx";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("board", JSON.stringify(newState));
  return newState;
};

export const BoardStateContext = React.createContext();
export const BoardDispatchContext = React.createContext();

function App() {
  useEffect(() => {
    const localData = localStorage.getItem("board");
    if (localData) {
      const boardList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (boardList.length >= 1) {
        dataId.current = parseInt(boardList[0].id) + 1;
        dispatch({ type: "INIT", data: boardList });
      }
    }
  }, []);

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, title, selectCategory, content, gameImg, rating) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date.replace(/-/g, "/")).getTime(),
        title,
        content,
        gameImg,
        rating,
        genres: selectCategory,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };

  // EDIT
  const onEdit = (
    targetId,
    date,
    title,
    content,
    gameImg,
    rating,
    selectCategory
  ) => {
    const currentDate = new Date();

    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: currentDate.getTime(),
        title,
        content,
        gameImg,
        rating,
        genres: selectCategory,
      },
    });
  };

  return (
    <BoardStateContext.Provider value={data}>
      <BoardDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <MyHeader />
          <div className="App">
            <Routes>
              <Route path="/" element={<Introduce />} />
              <Route path="/Board" element={<Board />} />
              <Route path="/New" element={<New />} />
              <Route path="/Read/:id" element={<Read />} />
              <Route path="/Edit/:id" element={<Edit />} />
              <Route path="/MyPage" element={<Mypage />} />
            </Routes>
          </div>
          <MyFooter />
        </BrowserRouter>
      </BoardDispatchContext.Provider>
    </BoardStateContext.Provider>
  );
}

export default App;
