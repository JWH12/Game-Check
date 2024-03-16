import React, { useState } from "react";
import Comment from "./Comment";

const CommentList = ({ CommentLists, editComment, deleteComment }) => {
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);
  return (
    <>
      <ul className="list_cnt">
        {CommentLists.map((comment) => {
          const commentId = comment.id;
          return (
            <Comment
              key={comment.id}
              comment={comment}
              isEditing={selectedCommentIndex === commentId ? true : false}
              editComment={editComment}
              deleteComment={deleteComment}
              setSelectedCommentIndex={setSelectedCommentIndex}
            />
          );
        })}
      </ul>
    </>
  );
};

export default CommentList;
