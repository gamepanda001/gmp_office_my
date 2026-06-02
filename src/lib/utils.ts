import { css } from "../../styled-system/css";
import { cx } from "../../styled-system/css";
import type { SystemStyleObject } from "../../styled-system/types";

/**
 * Utility function that combines Panda CSS's css() and cx() functions
 * Allows mixing of style objects and class names
 */
export function cn(
  ...inputs: Array<
    | string
    | SystemStyleObject
    | undefined
    | null
    | false
    | boolean
  >
): string {
  const classNames: string[] = [];
  const styleObjects: SystemStyleObject[] = [];

  for (const input of inputs) {
    if (typeof input === "string") {
      classNames.push(input);
    } else if (input && typeof input === "object") {
      styleObjects.push(input);
    }
  }

  const results: string[] = [];

  if (styleObjects.length > 0) {
    results.push(css(...styleObjects));
  }

  if (classNames.length > 0) {
    results.push(cx(...classNames));
  }

  return cx(...results);
}