import { $hasLoaded, $isOpen, $isPlayMode } from "../../../store";

export const playGame = () => {
    if (!$hasLoaded.get()) {
        $hasLoaded.set(true);
    }
    $isPlayMode.set(true)
}

export const onPlay = () => {
    const isConfirmed = localStorage.getItem("isConfirmed");
    if (!isConfirmed) {
        $isOpen.set(true)
    } else {
        playGame()
    }
}