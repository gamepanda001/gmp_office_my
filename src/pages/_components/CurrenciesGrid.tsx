import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import languages from "../../contents/language.json";
import Tooltip from "../../components/Tooltip";

function CurrenciesGrid() {

  
  return (
    <div
      className={grid({
        gridTemplateColumns: "repeat(4,  1fr)",
        gridTemplateRows: "repeat(3,  1fr)",
        gap: "10px",
        rowGap: { base: "40px", md: "32px" },
      })}
    >
      {languages.map(({ icon, id, name }) => {
        return (
          <Tooltip key={id} content={name}>
            <img
              src={icon}
              alt={`${name} currency icon`} 
              className={css({ 
                width: "56px", 
                height: "36px", 
                mx: "auto",
                cursor: "pointer" // 确保鼠标悬停时显示为可交互
              })}
              loading="eager"
            />
          </Tooltip>
        );
      })}
    </div>
  );
}

export default CurrenciesGrid;
