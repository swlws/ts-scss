declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.json" {
  const value: any;
  export default value;
}

// 模块声明
declare module "qs";
declare module "Base64";
declare module "element-ui";

// alais的声明
declare module "@log";
declare module "@dom";
declare module "@tool";

// 对象
interface FreeObject {
  [x: string]: any;
}

// 规则校验错误信息
interface RuleErrorCode {
  key: string;
  msg: string;
}
