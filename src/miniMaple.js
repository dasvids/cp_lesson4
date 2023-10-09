import { Term } from "./Term";

class MiniMaple {
  constructor(expression) {
    this.expression = expression;
  }
  //проверка валидности выражения
  isValidExpression() {
    const validChars = /^[0-9a-zA-Z\+\-\*\^]+$/;
    return validChars.test(this.expression);
  }
  splitTerms() {
    const termsWithSigns = this.expression.match(/[+-]?[^+-]+/g) || [];
    const terms = [];

    termsWithSigns.forEach((termWithSign) => {
      const sign = termWithSign.startsWith('-') ? '-' : '+';
      const term = termWithSign.replace(/^[+-]/, '');
      terms.push(new Term(term, sign));
    });

    return terms;
  }
  differentiate(variable) {
    //проверка если берем производную по переменной которой в выражении нет 
    if (!this.expression.includes(variable)) {
      return '0';
    }
    //проверка на валидность выражения
    if (!this.isValidExpression()) {
      throw new Error('Invalid expression');
    }

    let terms = this.splitTerms();
    //return ''.join(terms.map((term) => term.differentiate(variable))); //python moment -_-
    let res = terms.map((term) => term.differentiate(variable).toString()).join('')
    return res.startsWith('+')? res.substring(1) : res;
  }
}
export { MiniMaple }