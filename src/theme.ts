// as const
//  - 타입을 확정해 버린다.
const theme = {
  blueColor: "#3498db",
  greenColor: "#1abc9c",
  greyColor: "#7f8c8d",
  yellowColor: "#f1c40f"
} as const;

export type TTheme = typeof theme;

export default theme;
