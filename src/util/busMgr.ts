/**
 * 此文件为事件车的分发中心
 * 提供两个方法，$get,$off
 */

import Vue from 'vue';
import { getObjectType } from './tool';

// 事件车存储，key为事件车的唯一标识，value为事件车
const BUSES:FreeObject = {};

/**
 * 获取事件车实例
 * @param {*} key 事件车的唯一标识符
 */
function getInstance(key: string) {
  let type = getObjectType(key);

  if (type !== 'string') {
    return new Error('Param Key Must Be String');
  }

  let instance = BUSES[key];
  if (!instance) {
    instance = new Vue();
    BUSES[key] = instance;
  }

  return instance;
}
/**
 * 销毁实例
 * @param {*} key 事件车的唯一标识符
 */
function destroyedInstance(key: string) {
  let type = getObjectType(key);

  if (type !== 'string') {
    return new Error('Param Key Must Be String');
  }

  let instance = BUSES[key];
  if (instance) {
    instance.$off();
    BUSES[key] = null;
  }

  return true;
}

export default {
  $get: getInstance,
  $off: destroyedInstance,
};