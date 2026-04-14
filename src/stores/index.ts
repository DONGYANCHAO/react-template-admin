export { default as useLoginStore } from "./login";
export type { UserInfo, LoginState } from "./login";
export {
  selectUserInfo,
  selectSetUserInfo,
  selectClearUserInfo,
} from "./login";

export { default as useGlobalStore } from "./global";
export type { GlobalState } from "./global";
export { selectPrimaryColor, selectSetColor } from "./global";
