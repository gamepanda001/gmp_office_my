import { useStore } from "@nanostores/react";
import { $isPlayMode } from "../../../store";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

function GameSection({ children, className }: Props) {
  const isPlayMode = useStore($isPlayMode);
  
  // 在这里你可以根据 isPlayMode 状态做任何你需要的逻辑
  
  return (
    <div className={className}>
      {/* 你可以在这里根据 isPlayMode 条件渲染不同的内容 */}
      {isPlayMode ? (
        <div>游戏模式激活</div>
      ) : (
        <div>普通模式</div>
      )}
      {children}
    </div>
  );
}

export default GameSection; 