import { isObject } from "lodash";

function isObjectLiteral<T extends string>(value: T) {
  try {
    const result = JSON.parse(value);
    
    return isObject(result) && !Array.isArray(result);
  } catch (_) {
    return false;
  }
}

function isArrayLiteral<T extends string>(value: T) {
  try {
    const result = JSON.parse(value);
    
    return Array.isArray(result);
  } catch (_) {
    return false;
  }
}

function isUndefinedLiteral<T extends string>(value: T) {
  return value === 'undefined'
}

export { isObjectLiteral, isArrayLiteral, isUndefinedLiteral }