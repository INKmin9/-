/* eslint-disable react/jsx-no-target-blank */
import { useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface GameOverModalProps {
  isVisible: boolean;
  onClick: () => void;
  score: number;
}

let timeout: NodeJS.Timeout | null = null;

const GameOverModal = ({ isVisible, onClick, score }: GameOverModalProps) => {
  const [toastVisible, setToastVisible] = useState(false);

  if (!isVisible) return null;

  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "2026 제주들불축제 미니게임",
          text: "귀여운 [부리부리]를 모아, 가장 큰 [부리부리]를 찾으면 소정의 선물을 드려요!",
          url: "https://suikagame-festiv.netlify.app/",
        })
        .then(() => console.log("done"))
        .catch((error) => console.log(error));
    } else {
      timeout && clearTimeout(timeout);

      const urlToCopy = window.location.href;

      // Clipboard API를 지원하는지 확인
      if (document.queryCommandSupported("copy")) {
        const input = document.createElement("input");
        input.value = urlToCopy;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      } else {
        navigator.clipboard.writeText(urlToCopy);
      }

      setToastVisible(true);
      timeout = setTimeout(() => {
        setToastVisible(false);
      }, 2800);
    }
  };

  return (
    <div className={cx("gameOverArea")}>
      <span className={cx("text")}>GAME OVER</span>
      <span className={cx("score")}>SCORE: {score}</span>
      <button className={cx("btn")} onClick={onClick}>
        ↻ TRY AGAIN?
      </button>
      <div className={cx("linkArea")}>
        <a
          href={"https://forms.gle/4uT8FUgZuUR5U6zk6"}
          target="_blank"
          className={cx("formsLink")}
        >
          축제 게임 도입 신청하기
        </a>
        <button className={cx("shareaBtn")} onClick={share}>
          공유하기
        </button>
      </div>
      <div className={cx("toastArea", { show: toastVisible })}>
        🍉URL이 복사되었습니다.
      </div>
    </div>
  );
};

export default GameOverModal;
