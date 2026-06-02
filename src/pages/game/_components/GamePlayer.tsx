import { useEffect, useState } from 'react';
import { css } from '../../../../styled-system/css';
import api from '../../../utils/endpoints'

interface Props {
  gameCode: string
}

const iframeSx = css({
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: 'inherit',
});

function GamePlayer(props: Props) {
  const { gameCode } = props
  const [gameUrl, setGameUrl] = useState<string>("")

  useEffect(() => {
    const play = async () => {
      await api.login()
      const data = await api.playGame(gameCode)
      setGameUrl(data.game_url)
    }
    play()
  }, [gameCode])

  return (
    <iframe 
      className={iframeSx}
      allowFullScreen 
      src={gameUrl} 
      title="Game Player"
      allow="fullscreen"
    />
  )
}

export default GamePlayer