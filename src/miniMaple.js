import { Term } from "./Term.js";

class MiniMaple {
  constructor(expression) {
    this.expression = expression;
  }
  //проверка валидности выражения
  // isValidExpression() {
  //   const validExpressionRegex = /^[0-9a-zA-Z+\-*^()x]+$/;
  //   return validExpressionRegex.test(this.expression);
  // }

  splitTerms() {
    const termPattern = /(?<sign>[-+]?)(?<coef>\d*\.\d+|\d+)?\*?(?<base>\w)(?:\^(?:\(?(?<exponent>-?\d+)\)?))?/g; //победа над regex
    const terms = [];

    let match;
    while ((match = termPattern.exec(this.expression)) !== null) {
      const sign = match[1] || '+';
      const coef = Number(match[2]) || 1;
      const base = match[3];
      const exponent = Number(match[4]) || 1;
      //const term = `${sign}${coef}*${base}^${exponent}`;
      terms.push(new Term(sign, coef, base, exponent));
    }



    return terms;
  }


  differentiate(variable) {
    let terms = this.splitTerms();
    let derivativeTerms = terms.map(term => term.differentiate(variable));

    let derivativeTermsString = derivativeTerms.join('');

    return derivativeTermsString.startsWith('+') ? derivativeTermsString.slice(1) : derivativeTermsString;
  }
}
export { MiniMaple }