import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  slideInBottom: {
    "0%": {
      transform: "perspective(1000px) rotate3d(1,0,0,-25deg) translate3d(0px, 300px, -300px)",
      opacity: "0"
    },
    "100%": {
      transform: "perspective(1000px) rotate3d(1,0,0,0deg) translate3d(0px,0px, 0px)",
      opacity: "1"
    },
  },
  slideInLeft: {
    "0%": {
      transform: "translateX(-300px)",
      opacity: "0"
    },
    "100%": {
      transform: "translateX(0px)",
      opacity: "1"
    },
  },
  slideInRight: {
    "0%": {
      transform: "translateX(300px)",
      opacity: "0"
    },
    "100%": {
      transform: "translateX(0px)",
      opacity: "1"
    },
  },
  buttonsSlideIn: {
    "0%": {
      transform: "translateX(-50%) translateY(100px)",
      opacity: "0"
    },
    "100%": {
      transform: "translateX(-50%) translateY(0px)",
      opacity: "1"
    },
  },
  fadeIn: {
    "0%": {
      opacity: "0"
    },
    "100%": {
      opacity: "1"
    },
  },
  pullDown: {
    "0%": {
      paddingTop: "13.75%",
    },
    "100%": {
      paddingTop: "37.5%"
    },
  },
  marquee: {
    "0%": {
      transform: "translateX(0%)"
    },
    "100%": {
      transform: "translateX(-100%)"
    }
  },
  marqueeVertical: {
    "0%": {
      transform: "translateY(0%)"
    },
    "100%": {
      transform: "translateY(-100%)"
    }
  },
  marqueeReverse: {
    "0%": {
      transform: "translateX(-100%)"
    },
    "100%": {
      transform: "translateX(0%)"
    }
  },
});