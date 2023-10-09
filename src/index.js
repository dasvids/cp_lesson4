
import {MiniMaple} from "../src/miniMaple";
document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    const expressionInput = document.getElementById("expression");
    const resultParagraph = document.getElementById("result");

    // Добавляем обработчик события "click" на кнопку
    submitButton.addEventListener("click", function() {
        // Получаем значение из поля ввода
        const expression = expressionInput.value;
        let maple = new MiniMaple(expression);
        resultParagraph.textContent = maple.differentiate('x').toString();
        //alert(expression);
    });
});