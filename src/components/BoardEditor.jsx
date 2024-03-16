import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BoardDispatchContext } from "../App";
import { getStringDate } from "../util/date";

import StarRating from "./StarRating";

const BoardEditor = ({ isEdit, originData }) => {
  const titleRef = useRef();
  const contentRef = useRef();

  const [title, setTitle] = useState("");
  const [selectCategory, setSelectCategory] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState();
  const [gameImg, setGameImg] = useState("");
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();

  const { onCreate, onEdit } = useContext(BoardDispatchContext);

  const handleCheckboxChange = (value) => {
    setSelectCategory((gameCategories) =>
      gameCategories.includes(value)
        ? gameCategories.filter((genre) => genre !== value)
        : [...gameCategories, value]
    );
  };

  // Rating
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // gameThumbnail

  const gameThumbnail = (e) => {
    var reader = new FileReader();

    reader.onload = function (e) {
      setGameImg(e.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  // Submit
  const handleSubmit = () => {
    if (title.length < 2) {
      window.confirm("제목을 입력해주세요");
      titleRef.current.focus();
      return;
    }

    if (selectCategory.length === 0) {
      window.confirm("장르를 선택해주세요");
      return;
    }

    if (content.length < 5) {
      window.confirm("내용을 입력해주세요");
      contentRef.current.focus();
      return;
    }

    if (rating === undefined) {
      window.confirm("별점을 정해주세요");
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "게시글을 수정하시겠습니까?" : "게시글을 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, title, selectCategory, content, gameImg, rating);
      } else {
        onEdit(
          originData.id,
          date,
          title,
          content,
          gameImg,
          rating,
          selectCategory
        );
      }
    }

    navigate("/Board");
    console.log(date, title, content, rating, gameImg, selectCategory);
  };

  const goBoard = () => {
    navigate("/Board");
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setTitle(originData.title);
      setContent(originData.content);
      setRating(originData.rating);
      setGameImg(originData.gameImg);
    }
  }, [isEdit, originData]);

  return (
    <div className="New">
      <section className="page_name">
        <div>게시글 글쓰기</div>
      </section>

      <section className="create_post">
        <table>
          <tr className="create_post_title">
            <th>제목</th>
            <td>
              <input
                type="text"
                placeholder="제목을 입력해 주세요"
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
          </tr>

          <tr className="create_post_title">
            <th>장르</th>
            <td className="category_checkbox">
              <span>
                <input
                  type="checkbox"
                  value="action"
                  checked={selectCategory.includes("액션")}
                  onChange={() => handleCheckboxChange("액션")}
                />
                액션
              </span>
              <span>
                <input
                  type="checkbox"
                  value="FPS"
                  checked={selectCategory.includes("FPS")}
                  onChange={() => handleCheckboxChange("FPS")}
                />
                FPS
              </span>
              <span>
                <input
                  type="checkbox"
                  value="RPG"
                  checked={selectCategory.includes("RPG")}
                  onChange={() => handleCheckboxChange("RPG")}
                />
                RPG
              </span>
              <span>
                <input
                  type="checkbox"
                  value="sport"
                  checked={selectCategory.includes("스포츠")}
                  onChange={() => handleCheckboxChange("스포츠")}
                />
                스포츠
              </span>
            </td>
          </tr>

          <tr className="create_post_content">
            <th>내용</th>
            <td>
              <textarea
                placeholder="내용을 입력해 주세요"
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <th>별점</th>
            <td>
              <StarRating onRatingChange={handleRatingChange} />
            </td>
          </tr>

          <tr>
            <th>파일첨부</th>
            <td>
              <input
                type="file"
                accept="image/*"
                className="create_post_file"
                onChange={gameThumbnail}
              />
            </td>
          </tr>
        </table>
      </section>

      <section>
        <div className="create_post_button">
          <button onClick={goBoard}>취소</button>
          <button onClick={handleSubmit}>작성</button>
        </div>
      </section>
    </div>
  );
};

export default BoardEditor;
