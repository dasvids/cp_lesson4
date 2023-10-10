import {MiniMaple} from "../src/miniMaple";
document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    const expressionInput = document.getElementById("expression");
    const variableInput = document.getElementById("variable");
    const resultParagraph = document.getElementById("result");

    // Добавляем обработчик события "click" на кнопку
    submitButton.addEventListener("click", function() {
        // Получаем значение из поля ввода
        const expression = expressionInput.value;
        const variable = variableInput.value;
        let maple = new MiniMaple(expression);
        resultParagraph.textContent = maple.differentiate(variable).toString();
        //alert(expression);
    });
});