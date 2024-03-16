import React, { useState } from "react";

const Comment = ({
  comment: { id, content },
  isEditing,
  setSelectedCommentIndex,
  editComment,
  deleteComment,
}) => {
  const [editValue, setEditValue] = useState(content);

  const handleEditInput = () => {
    console.log("handing edit input");
    editComment(id, editValue);
    setSelectedCommentIndex(0);
  };

  // 댓글 수정
  const editInput = (
    <div className="cmt_edit_form">
      <input
        type="text"
        className="cmt_edit_content"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleEditInput() : null)}
      />
      <span>
        <button className="cmt_edit_content_bnt" onClick={handleEditInput}>
          수정
        </button>
      </span>
    </div>
  );

  // 댓글 삭제
  const handleDeleteClick = () => {
    deleteComment(id);
  };

  return (
    <li id={id}>
      <div className="create_comments">
        <div className="comment_title">{id}번 닉네임</div>
        {isEditing ? (
          editInput
        ) : (
          <div className="post_comments_content">
            {content}
            <span className="post_comments_btn">
              <button
                onClick={() =>
                  isEditing ? handleEditInput() : setSelectedCommentIndex(id)
                }
              >
                수정
              </button>
              <button onClick={handleDeleteClick}>삭제</button>
            </span>
          </div>
        )}
      </div>
    </li>
  );
};

export default Comment;
