import logger from "@log";
import myAxios from "./httplib";

const ruleError = (key: string, pre?: string) => {
  return {
    key: `${pre ? pre + "." : ""}${key}`,
    msg: `Param Only Support [String, Number, Boolean, Array, Object]`
  };
};

/**
 * 参数语法的校验，仅支持五种类型String, Number, Boolean, Array, Object
 * @param rule
 */
function paramRuleValidate(
  rule: FreeObject,
  pre?: string
): Array<RuleErrorCode> {
  if (!rule) return [] as Array<RuleErrorCode>;

  const types = [String, Number, Boolean, Array, Object];

  const res: Array<RuleErrorCode> = [];
  Object.keys(rule).forEach(key => {
    const v = rule[key];

    if (typeof v === "object") {
      !v.type
        ? res.push({ key: key, msg: "The Type Field Must Be Specified" })
        : "";
      !types.includes(v.type) ? res.push(ruleError(key, pre)) : "";
    } else if (!types.includes(v)) {
      res.push(ruleError(key, pre));
    }
  });
  return res;
}

function collectApis(): FreeObject {
  const apis: FreeObject = {};

  const requireComponent = require.context("./modules", false, /(.*)\.ts$/);
  requireComponent.keys().forEach(fileName => {
    const matchModuleName: any[] = fileName.match(/^\.\/(.*)\.ts$/) || [];
    const moduleName = matchModuleName[1];
    if (!moduleName) return;

    const componentConfig = requireComponent(fileName);
    const defaultExport = componentConfig.default;
    if (!defaultExport) return;

    apis[moduleName] = defaultExport;
  });

  return apis;
}

function parseApi(apiConfig: FreeObject): FreeObject {
  if (!apiConfig) return {};

  const apis: FreeObject = {};
  Object.keys(apiConfig).forEach(moduleName => {
    apis[moduleName] = {};

    const module: FreeObject = (apiConfig as FreeObject)[moduleName] || {};
    Object.keys(module).forEach(funcName => {
      const { url, params } = module[funcName];
      let { method } = module[funcName];

      const paramRuleValidateRes = paramRuleValidate(params);
      if (paramRuleValidateRes.length > 0) {
        logger.error(
          "Verification Of Http Request Parameter Rules Failed",
          paramRuleValidateRes
        );
        return;
      }

      method = method.toLowerCase();

      const httpMethod = (myAxios as FreeObject)[method];

      if (httpMethod) {
        apis[moduleName][funcName] = httpMethod.bind(null, url);
      }
    });
  });

  return apis;
}

function install(Vue: any) {
  const apis = parseApi(collectApis());
  Vue.prototype.$api = apis;
}

export default {
  install
};
