import { Term } from "./Term.js";

class MiniMaple {
  constructor(expression) {
    this.expression = expression;
  }
  //проверка валидности выражения
  isValidExpression() {
    const validExpressionRegex = /^[0-9a-zA-Z+\-*^()x]+$/;
    return validExpressionRegex.test(this.expression);
  }

  splitTerms() {
    const termPattern = /(?<sign>[-+]?)(?<coef>\d*\.\d+|\d+)?\*?(?<base>\w)(?:\^(?:\(?(?<exponent>-?\d+)\)?))?/g; //победа над regex
    const terms = [];
    
    let match;
    while ((match = termPattern.exec(this.expression)) !== null) {
        const sign = match[1] || '+';
        const coef = Number(match[2]) || 1;
        const base = match[3];
        const exponent =  Number(match[4]) || 1;
        //const term = `${sign}${coef}*${base}^${exponent}`;
        terms.push(new Term(sign, coef, base, exponent));
    }

    

    return terms;
  }


  differentiate(variable) {
    const terms = this.splitTerms();
    const derivativeTerms = [];

    for (const term of terms) {
      if (term.base === variable) {
        // Если основание термина совпадает с переменной, вычисляем производную.
        const newCoefficient = term.coefficient * term.exponent;
        const newExponent = term.exponent - 1;

        if (newExponent === 0) {
          // Если новая степень равна 0, создаем термин без степени.
          derivativeTerms.push(new Term(term.sign, newCoefficient, '', 0));
        } else {
          // В противном случае создаем термин с новой степенью.
          derivativeTerms.push(new Term(term.sign, newCoefficient, variable, newExponent));
        }
      }
    }

    // Собираем термины производной в одно выражение.
    const derivativeExpression = derivativeTerms.map(term => term.toString()).join('');

    // Если производная пуста (нет терминов), возвращаем '0'.
    return derivativeExpression !== '' ? derivativeExpression : '0';
  }
}
export { MiniMaple }