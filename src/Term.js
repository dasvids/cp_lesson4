// class Term {
//     constructor(expr, sign) {
//         this.expr = expr;
//         this.sign = sign;
//     }

//     toString() {
//         if (this.sign === "+") {
//             return this.expr;
//         } else if (this.sign === "-") {
//             return `-${this.expr}`;
//         } else {
//             return this.expr;
//         }
//     }

//     differentiate(variable) {
//         const [coefficient, power] = this.parseExpression(this.expr);

//         if (this.containsVariable(this.expr, variable)) {
//             let newCoefficient = coefficient * power;
//             const newPower = power - 1;
//             if (newCoefficient < 0) {
//                 newCoefficient = Math.abs(newCoefficient);
//                 this.sign = this.sign === '+' ? '-' : '+';
//             }
//             if (power === 0) {
//                 return new Term("0", "+"); // ну очевидно что произойдет
//             }
//             else if (newPower === 1) {
//                 return new Term(`${newCoefficient}*${variable}`, this.sign);
//             } else {
//                 return new Term(`${newCoefficient}*${variable}^${newPower}`, this.sign);
//             }
//         } else {
//             return new Term("0", ""); // Если переменной нет, возвращаем 0
//         }
//     }

//     parseExpression(expr) {
//         const coefficientPowerMatch = expr.match(/(-?\d*\.*\d*)(\*?)([a-zA-Z])(\^(-?\d+))?/);
//         const coefficient = coefficientPowerMatch ? coefficientPowerMatch[1] || 1 : 1;
//         const power = coefficientPowerMatch ? coefficientPowerMatch[5] || 1 : 1;
//         return [parseFloat(coefficient), parseInt(power)];
//     }

//     containsVariable(expr, variable) {
//         return expr.includes(variable);
//     }
// }

//так получше будет чем до этого
class Term {
    constructor(sign, coef, base, exponent) {
        this.sign = sign; // Знак (+ или -)
        this.coef = coef; // Коэффициент
        this.base = base; // Основание
        this.exponent = exponent; // Степень
    }

    toString() {
        let result = this.sign;

        if (this.coef !== 1 && (this.base === '' || this.exponent !== 0)) {
            result += this.coef;
        }

        if (this.base !== '' && this.exponent!== 0) {
            result += this.coef !== 1 ? '*':'';
            result += this.base;
        }

        if (this.exponent !== 0 && this.exponent > 1) {  
            result += '^' + this.exponent;
        } else if (this.exponent !== 0 && this.exponent < 0) {
            result += '^(' + this.exponent + ')';
        }

        return result;
    }

    differentiate(variable) {
        if (variable !== this.base) {
            // Если переменная variable не совпадает с основанием, производная равна нулю.
            return new Term('+', 0, '', 0);
        }

        let newCoef = this.coef * this.exponent;
        let newExponent;
        let newSign = this.sign;

        if (this.exponent === 0) {
            // Если исходная степень равна 0, производная всегда равна 0.
            return new Term('+', 0, '', 0);
        } else if (this.exponent === 1) {
            // Если исходная степень равна 1, новая степень равна 0, коэффициент не изменяется.
            newExponent = 0;
        } else {
            // В противном случае, новая степень уменьшается на 1.
            newExponent = this.exponent - 1;


            if (this.sign === '-' && this.exponent < 0) {
                newSign = '+';
            }
        }

        if (newExponent === 0) {
            // Если новая степень равна 0, возвращаем только коэффициент.
            return new Term(newSign, Math.abs(newCoef), '', 0);
        } else {
            // В противном случае возвращаем новый объект Term.
            return new Term(newSign, Math.abs(newCoef), this.base, newExponent);
        }
    }
}
export { Term }