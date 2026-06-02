import { css } from "../../../../styled-system/css";
import { flex } from "../../../../styled-system/patterns";
import Tooltip from "../../../components/Tooltip";
import languages from "../../../contents/language.json";

function FlagGird() {
    return (
        <ul className={flex({ gap: "10px", flexWrap: "wrap", maxWidth: "512px" })} >
            {languages.map((currency) => (
                <li className={css({ flexShrink: 0 })}>
                    <Tooltip key={currency.id} content={currency.name}>
                        <img
                            src={currency.icon}
                            alt={`${currency.name} currency icon`}
                            className={css({
                                width: "56px",
                                height: "36px",
                                mx: "auto",
                                cursor: "pointer", // 确保鼠标悬停时显示为可交互
                            })}
                            loading="eager"
                        />
                    </Tooltip>
                </li>
            ))}
        </ul>
    )
}

export default FlagGird;