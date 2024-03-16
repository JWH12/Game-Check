import styled from "@emotion/styled";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;

  & svg {
    color: gray;
    cursor: pointer;
    height: 30px;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

const Score = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const ARRAY = [0, 1, 2, 3, 4];

function StarRating({ onRatingChange }) {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [score, setScore] = useState(0);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);

    let newScore = clickStates.filter(Boolean).length;
    setScore(newScore);
    onRatingChange(newScore);
  };

  return (
    <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => (
          <FaStar
            key={idx}
            size="50"
            onClick={() => handleStarClick(el)}
            className={clicked[el] && "yellowStar"}
          />
        ))}
        <Score> / {score} 점</Score>
      </Stars>
    </Wrap>
  );
}

export default StarRating;
