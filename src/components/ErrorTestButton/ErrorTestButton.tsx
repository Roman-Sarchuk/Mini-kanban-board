import style from "./Kanban.module.scss";

function ErrorTestButton() {
  const breakTheWorld = () => {
    throw new Error("Test Error: Manual error throw!");
  };

  return (
    <span className={style.raiseErrorButton} onClick={breakTheWorld}>
      Raise error
    </span>
  );
}

export default ErrorTestButton;
