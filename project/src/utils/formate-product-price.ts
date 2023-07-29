
export function formateProductPrice(price: number) {
  if(price) {
    const numStr: string = price.toString();
    let result = '';

    for (let i = numStr.length - 1, j = 1; i >= 0; i--, j++) {
      result = numStr[i] + result;

      if (j % 3 === 0 && i > 0) {
        result = ` ${ result} `;
      }
    }
    result = ` ${ result} ₽`;
    return result;
  }
}
