// check if url is legal
export const CHECK_IS_LEGAL = /http(s?):\/\/.*\.(js|css|json|jsonp)/;

// check if originUrl include regExp
// check if [ ] ( ) \ * ^ $ exist
export const ORIGIN_URL_REG = /\\|\[|]|\(|\)|\*|\$|\^/i;