import React, { useEffect } from "react";
import BoardEditor from "../components/BoardEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Game Check - 글쓰기`;
  }, []);

  return (
    <div>
      <BoardEditor />
    </div>
  );
};

export default New;
