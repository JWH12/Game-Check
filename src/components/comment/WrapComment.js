import React, { useContext, useEffect, useState } from "react";
import { BoardDispatchContext } from "../../App";
import CommentList from "./CommentList";

const WrapComment = ({ boardId }) => {
  const [input, setInput] = useState("");
  const [commentList, setCommentList] = useState([]);

  // 댓글을 로드
  useEffect(() => {
    const loadComment = localStorage.getItem(`comments_${boardId}`);
    if (loadComment) {
      const parsedComments = JSON.parse(loadComment);
      const sortedComments = parsedComments.sort((a, b) => a.id - b.id);
      setCommentList(sortedComments);
    }
  }, [boardId]);

  // 댓글이 업데이트될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(`comments_${boardId}`, JSON.stringify(commentList));
  }, [boardId, commentList]);

  // 댓글 추가
  const addComment = () => {
    if (input.trim() !== "") {
      const addedCmtId =
        commentList.length > 0 ? commentList[commentList.length - 1].id + 1 : 1;
      const newComment = {
        id: addedCmtId,
        content: input,
      };
      setCommentList((prevList) => [...prevList, newComment]);
      setInput("");
    }
  };

  // 댓글 수정
  const editComment = (commentId, editValue) => {
    let newCommentList = commentList.map((comment) => {
      if (comment.id === commentId) {
        comment.content = editValue;
      }
      return comment;
    });

    setCommentList(newCommentList);
  };

  // 댓글 삭제
  const deleteComment = (commentId) => {
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      const updatedComments = commentList.filter(
        (comment) => comment.id !== commentId
      );
      setCommentList(updatedComments);
    }
  };

  return (
    <>
      <CommentList
        CommentLists={commentList}
        editComment={editComment}
        deleteComment={deleteComment}
      />
      <div className="cmt_create_form">
        <input
          className="cmt_create"
          type="text"
          placeholder="댓글을 입력해 주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? addComment() : null)}
        />
        <button
          disabled={input.trim() === ""}
          onClick={addComment}
          className="create_cmt_btn"
        >
          등록
        </button>
      </div>
    </>
  );
};

export default WrapComment;
