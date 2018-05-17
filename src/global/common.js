// Base64编码
export const Base64Encode = function(value) {
    return Buffer.from(value).toString('base64');
};

// Base64解码
export const Base64Decode = function(value) {
    value = value.replace(/\s/g, '+');
    return Buffer.from(value, 'base64').toString();
};
