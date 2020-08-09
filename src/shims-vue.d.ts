declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "qs";
declare module "lodash/upperFirst";
declare module "lodash/camelCase";

declare module '*.json' {
  const value: any;
  export default value
}

interface FreeObject {
  [x: string]: any;
}

// 规则校验错误信息
interface ruleErrorCode{
  key: String,
  msg: String
}

// alais的声明
declare module '@log'
declare module '@dom'