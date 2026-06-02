import { cx, sva } from '../../styled-system/css'

export const navButton = sva({
  slots: ['root', 'arrow'],
  base: {
    root: {
      width: "1em",
      height: "1em",
      borderRadius: "50%",
      backgroundColor: { base: "#F5F5F5", _hover: "#01B6CF" },
      color: { base: "#01B6CF", _hover: "#F5F5F5" },
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    arrow: {
      width: "0.33em",
      height: "0.33em",
      borderColor: "currentColor",
      borderStyle: "solid",
      borderRight: "0px",
      borderBottom: "0px",
      transformOrigin: "center",
    }
  },
  variants: {
    visual: {},
    size: {
      sm: {

      },
      md: {
        root: {
          fontSize: "48px",
        },
        arrow: {
          borderTopWidth: "0.125em",
          borderLeftWidth: "0.125em",
        }
      },
      lg: {
        root: {
          fontSize: "56px",
        },
        arrow: {
          width: "0.25em",
          height: "0.25em",
          borderTopWidth: "3px",
          borderLeftWidth: "3px",
        }
      }
    },
    color: {
      primary: {
        root: {
          backgroundColor: { base: "#F5F5F5", _hover: "#01B6CF" },
          color: { base: "#01B6CF", _hover: "#F5F5F5" },
        },
      },
      translucent: {
        root: {
          backgroundColor: { base: "#00000080", _hover: "#000000CC" },
          color: { base: "#FFFFFF", _hover: "#F74774" },
        }
      },
    }
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

interface Props {
  direction?: "left" | "right";
  className?: string
  size?: "sm" | "md" | "lg";
  color?: 'primary' | 'translucent';
}

function SwiperNavBtn(props: Props) {
  const { className, direction = 'left', size, color } = props;
  const classes = navButton({ size, color })
  return (
    <div className={cx("group", classes.root, className)}>
      <i className={cx(classes.arrow)} style={{ transform: direction === 'left' ? "translateX(2px) rotate(-45deg)" : "translateX(-2px) rotate(135deg)" }} />
    </div>
  )
}

export default SwiperNavBtn