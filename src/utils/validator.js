// Validator of inputs
const word = (data = "") => {
  let result = /[A-Za-záéëËíóúÁÉÍÓÚñÑñÑ0-9_]{1,100}/i.exec(data);
  if (result) return result[0].length === data.length;
  return false;
};

const validPassword = (data = "") => {
  let result = /[A-Za-záéëËíóúÁÉÍÓÚñÑñÑ0-9_]{6,20}/i.exec(data);
  let noSpace = !/(\W)/g.exec(data);
  if (result) return result[0].length === data.length && noSpace;
  return false;
};

const validDate = (value = "") => {
  const isValid = new Date(value).toString() !== "Invalid Date";
  return isValid;
};

const allSpace = (data = "") => {
  let spaces = 0;
  for (let i = 0; i < data.length; i++) {
    let result = /\s/g.test(data[i]);
    if (result) spaces++;
  }
  let result = spaces === data.length;
  return result;
};

const validText = (data = "") => {
  let result = /[(\r\n|\r|\n)A-Za-záéëËíóúÁÉÍÓÚñÑ0-9_:#$&/*¡;%?=()"\]\, /[/.-]{2,500}/gi.exec(data);
  let inRange = data.length >= 2 && data.length <= 500;
  if (result) return result[0].length === data.length && inRange && !allSpace(data);
  return false;
};

const validName = (data = "") => {
  let result = /[A-Za-záéëËíóúÁÉÍÓÚñÑ0-9_ .]{3,50}/i.exec(data);
  if (result) return result[0].length === data.length && !allSpace(data);
  return false;
};

const validAddress = (data = "") => {
  let result = /[A-Za-záéíëËóúÁÉÍÓÚñÑ#/.,0-9-_ ]{1,500}/i.exec(data);
  if (result) return result[0].length === data.length;
  return false;
};

const validNumber = payload => {
  const value = String(payload);
  let result = /[0-9]{1,100}/g.exec(value);
  console.log({ value, result });
  if (result) return result[0].length === value.length;
  return false;
};

const validPhone = (value = "") => {
  let result = /[0-9()+]{1,100}/g.exec(value);
  if (result) return result[0].length === value.length;
  return false;
};

const validCellPhone = (value = "") => {
  let result = /([3]{1})([0-2]{1})([0-9]{1})[0-9]{7}/g.exec(value);
  if (result) return result[0].length === value.length;
  return false;
};

const validEmail = (value = "") => {
  let result = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){3}\.[a-z]{2,3}$/g.exec(value);
  if (result) return result[0].length === value.length;
  return false;
};

const enumeration = (list = [], value) => {
  let result = list.some(item => item === value);
  if (result === false) {
    console.log("enumeration: ", list, " value: ", value);
  }
  return result;
};

const validFilesize = value => {
  const MAXSIZE = 10000000; //10.000.000 Bytes => 10MB
  let isValid = validNumber(value);
  if (isValid) {
    value = Number(value);
    //console.log("FILESIZE: ", value);
    return value <= MAXSIZE;
  } else {
    return false;
  }
};

const validCC = value => {
  let result = /([0-9]{10})|([0-9]{9})|([0-9]{8})|([0-9]{7})|([0-9]{6})/g.exec(value);
  if (result) return result[0].length === value.length;
  return false;
};

const validNITFormat = (value = "") => {
  value = value.replace(/([.-])/g, "");
  const secuencia = [41, 37, 29, 23, 19, 17, 13, 7, 3];
  let count = 0;
  secuencia.forEach((current, index) => {
    count += Number(value[index]) * current;
  });
  count = count % 11;
  if (count >= 2) count = 11 - count;
  return count === Number(value[9]);
};

const validNIT = (value = "") => {
  // if(value.length !== 10) return false;
  let isValid = false;
  let points = /(\d{3}[.])(\d{3}[.])(\d{3}[-])(\d{1})/g.exec(value);
  let dash = /(\d{1,9}[-])(\d{1})/g.exec(value);
  let numbers = /(\d){10}/g.exec(value);
  if (points) {
    isValid = points[0].length === value.length;
    if (isValid) return validNITFormat(value);
    return false;
  }

  if (dash) {
    isValid = dash[0].length === value.length;
    if (isValid) return validNITFormat(value);
    return false;
  }

  if (numbers) {
    isValid = numbers[0].length === value.length;
    if (isValid) return validNITFormat(value);
    return false;
  }
  return false;
};

const validCC_NIT = (value = "") => {
  let nit = validNIT(value);
  let cc = validCC(value);
  return nit || cc;
};

exports.enumeration = {
  validator: enumeration,
  msg: "Invalid enumeration format"
};

exports.validName = {
  validator: validName,
  msg: "Invalid name format"
};

exports.validCC = {
  validator: validCC,
  msg: "Invalid identificación formart"
};

exports.validNIT = {
  validator: validNIT,
  msg: "Invalid identificación formart"
};

exports.validCC_NIT = {
  validator: validCC_NIT,
  msg: "Invalid identification format"
};

exports.validWord = {
  validator: word,
  msg: "Invalid string format"
};

exports.validCellPhone = {
  validator: validCellPhone,
  msg: "wrong cellphones format"
};
exports.validPassword = {
  validator: validPassword,
  msg: "wrong password format"
};

exports.validAddress = {
  validator: validAddress,
  msg: "wrong address format"
};

exports.validNumber = {
  validator: validNumber,
  msg: "wrong number format"
};

exports.validEmail = {
  validator: validEmail,
  msg: "wrong email format"
};

exports.validPhone = {
  validator: validPhone,
  msg: "wrong phone format"
};

exports.validText = {
  validator: validText,
  msg: "wrong text format"
};
exports.allSpace = {
  validator: allSpace,
  msg: "wrong spaces format"
};
exports.validFilesize = {
  validator: validFilesize,
  msg: "wrong filesize"
};

exports.validDate = {
  validator: validDate,
  msg: "wrong date format"
};
