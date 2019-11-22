function calculateExpression(postfix) {
    let tempStack = [];
    const variab = postfix.map((indElem) => {
        if (!isNaN(indElem)) {
            tempStack.push(parseFloat(indElem));

        }
        else {
            let secondNum = tempStack.pop();
            let firstNum = tempStack.pop();
            let tempResult = null;

            switch (indElem) {
                case '+':
                    tempResult = firstNum + secondNum;
                    break;
                case '*':
                    tempResult = firstNum * secondNum;
                    break;
                case '-':
                    tempResult = firstNum - secondNum;
                    break;
                case '/':
                    tempResult = firstNum / secondNum;
                    break;
                case '%':
                    tempResult = firstNum % secondNum;
                    break;
            }
            tempStack.push(tempResult);
        }

    })
    let result = tempStack.pop();
    return result;
}

module.exports = calculateExpression;