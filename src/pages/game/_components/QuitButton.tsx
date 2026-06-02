import { css, cx } from "../../../../styled-system/css";
import quitSvg from "../../../assets/quit.svg";
import { button } from "../../../styles/recipes";
import { $isPlayMode } from "../../../store";

interface Props {
  className?: string;
}

function QuitButton(props: Props) {
  const { className } = props;

  const onQuit = () => {
    $isPlayMode.set(false);
  };

  const onClick = () => onQuit();

  return (
    <button
      className={cx(
        button({ color: "secondary" }),
        css({ width: "180px", height: "56px !important", textStyle: "20_800_100", gap: "8px" }),
        className
      )}
      type="button"
      onClick={onClick}
    >
      <img className={css({ display: "inline-block" })} src={quitSvg.src} alt="Quit game button icon" width={24} height={24} />
      <span>Quit</span>
    </button>
  );
}

export default QuitButton;
