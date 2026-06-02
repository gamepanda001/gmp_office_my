import { cva } from "../../styled-system/css";

export const button = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    cursor: "pointer",
    borderRadius: "9999px",
    color: "#FFFFFF",
    gap: "16px",
  },
  variants: {
    visual: {
      primary: {},
      ghost: {
        
      }
    },
    size: {
      sm: {
        height: "46px",
        width: "150px",
        gap: "8px",
        textStyle: "16_800_100",
      },
      full: {
        height: "46px",
        width: "100%",
        textStyle: "16_800_100",
      },
      modal: {
        borderRadius: '12px',
        height: "48px",
        width: "100%",
        textStyle: "16_800_100",
      },
      md: {
        height: "68px",
        width: "240px",
        textStyle: "24_800_100",
      },
      gameCta: {
        width: "max-content",
        px: '24px',
        py: { base: '16px', md: '24px'},
        gap: '14px',
        textStyle: { base: "24_800_100", md: "32_800_125" },
      },
      homeCta: {
        width: "max-content",
        px: '24px',
        py: '16px',
        gap: '14px',
        textStyle: { base: "24_800_100", md: "32_800_125" },
      },
    },
    color: {
      primary: {
        backgroundColor: { base: "#01B6CF", _hover: "#0ECCE7" },
      },
      secondary: {
        backgroundColor: { base: "#F74774", _hover: "#FF5480" },
      },
    }
  },
  compoundVariants: [
    {
      visual: 'ghost',
      color: 'primary',
      css: {
        color: '#F74774',
        bgColor: "transparent",

      }
    }
  ],
  defaultVariants: {
    visual: "primary",
    size: "md",
    color: "primary",
  },
});

// 表单输入框样式配方
export const formField = cva({
  base: {
    width: "100%",
    padding: "16px",
    height: "46px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    backgroundColor:"#FAFAFA",
    lineHeight: "1.5",
    color: "#1F2937",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    fontWeight: "700",
    _placeholder: {
      color: "#9CA3AF",
      fontWeight: "400",
    },
    _focus: {
      borderColor: "#01B6CF",
      boxShadow: "0 0 0 3px rgba(1, 182, 207, 0.1)",
    },
    _disabled: {
      backgroundColor: "#F9FAFB",
      color: "#6B7280",
      cursor: "not-allowed",
    },
    fontSize: {
      base: "14px",
      md: "16px",
      lg: "18px",
    },
  },
  variants: {
    size: {
      sm: {
        padding: "8px 12px",
      },
      md: {
        padding: "12px 16px",
      },
      lg: {
        height: '56px',
        padding: "16px 20px",
      },
    },
    variant: {
      default: {},
      error: {
        borderColor: "#F74774",
        _focus: {
          borderColor: "#F74774",
          boxShadow: "0 0 0 3px rgba(247, 71, 116, 0.1)",
        },
      },
    },
    display: {
      input: {
        resize: "none",
      },
      textarea: {
        height: "92px",
        backgroundColor: "#FAFAFA",
        resize: "none",
        p:"12px"
      },
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    display: "input",
  },
});

// 表单标签样式配方
export const formLabel = cva({
  base: {
    display: "block",
    fontSize: "14px",
    fontWeight: "400",
    color: "#374151",
    lineHeight: "1.25",
    mb: {
      base: "16px",
      md: "0px"
    }
  },
  variants: {
    size: {
      sm: {
        fontSize: "12px",
      },
      md: {
        fontSize: "14px",
      },
      lg: {
        fontSize: "16px",
      },
    },
    required: {
      true: {
        _after: {
          content: '"*"',
          color: "#F74774",
          marginLeft: "4px",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// 表单错误信息样式配方
export const formError = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
    color: "#F74774",
    marginTop: "4px",
    lineHeight: "1.25",
    animation: "fadeIn 0.2s ease-in-out",
    fontWeight: "500",
  },
  variants: {
    size: {
      sm: {
        fontSize: "12px",
      },
      md: {
        fontSize: "14px",
      },
      lg: {
        fontSize: "16px",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// 表单下拉框样式配方
export const formSelect = cva({
  base: {
    width: "100%",
    padding: "12px 16px",
    paddingRight: "40px",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#1F2937",
    backgroundColor: "#FAFAFA",
    backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
    backgroundPosition: "right 12px center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "16px",
    appearance: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    _focus: {
      borderColor: "#01B6CF",
      boxShadow: "0 0 0 3px rgba(1, 182, 207, 0.1)",
    },
    _disabled: {
      backgroundColor: "#F9FAFB",
      color: "#6B7280",
      cursor: "not-allowed",
    },
  },
  variants: {
    size: {
      sm: {
        padding: "8px 12px",
        paddingRight: "32px",
        fontSize: "14px",
      },
      md: {
        padding: "12px 16px",
        paddingRight: "40px",
        fontSize: "16px",
      },
      lg: {
        padding: "16px 20px",
        paddingRight: "48px",
        fontSize: "18px",
      },
    },
    variant: {
      default: {},
      error: {
        borderColor: "#F74774",
        _focus: {
          borderColor: "#F74774",
          boxShadow: "0 0 0 3px rgba(247, 71, 116, 0.1)",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

// 表单单选按钮样式配方
export const formRadio = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#1F2937",
  },
  variants: {
    size: {
      sm: {
        fontSize: "14px",
        gap: "6px",
      },
      md: {
        fontSize: "16px",
        gap: "8px",
      },
      lg: {
        fontSize: "18px",
        gap: "10px",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// 表单单选按钮输入框样式
export const formRadioInput = cva({
  base: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #01B6CF",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    appearance: "none",
    position: "relative",
    flexShrink: 0,
    _checked: {
      borderColor: "#01B6CF",
      backgroundColor: "#FFFFFF",
      _after: {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: "#01B6CF",
      },
    },
    _focus: {
      boxShadow: "0 0 0 3px rgba(1, 182, 207, 0.1)",
    },
    _disabled: {
      backgroundColor: "#F9FAFB",
      borderColor: "#D1D5DB",
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      default: {},
      error: {
        borderColor: "#F74774",
        _checked: {
          borderColor: "#F74774",
          backgroundColor: "#F74774",
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// 表单容器样式配方
export const formContainer = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },
  variants: {
    size: {
      sm: {
        gap: "16px",
      },
      md: {
        gap: "20px",
      },
      lg: {
        gap: "24px",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
