class PostfixEquation {
    constructor(infix) {
        // this.infix = infix;
        this.infix = this.convertToValidInfix(infix);
        this.priority0 = [
            '+', '-'
        ]
        this.priority1 = [
            '*', '/'
        ]
        this.priority2 = [
            '%'
        ]
        this.tempStack = [];
        this.outputStack = [];
    }

    convertToValidInfix(infix) {
        let tempStr = '';
        let validInfix = [];
        let v = infix.map((ini) => {
            if (!isNaN(ini) ||  (ini === '.')) {
                tempStr += ini;
            }
            else{
                if(tempStr != ''){
                    validInfix.push(tempStr);
                }
                validInfix.push(ini);
                tempStr = '';   
            }
        })
        if(tempStr != ''){
            validInfix.push(tempStr);
        }

        return validInfix;
    }

    findCompareValue(x) {
        if (this.priority0.includes(x)) {
            return 0;
        }
        else if (this.priority1.includes(x)) {
            return 1;
        }
        else if (this.priority2.includes(x)) {
            return 2;
        }
    }

    replaceHigherOperator(x) {
        let lastElement = this.tempStack.pop();

        if (this.findCompareValue(x) <= this.findCompareValue(lastElement)) {
            this.outputStack.push(lastElement);
        }
        else {
            this.tempStack.push(lastElement);
            // this.tempStack.push(x);
        }
    }

    covertToEquation() {
        const variab = this.infix.map((individualElem) => {
            if (!isNaN(individualElem)) {
                this.outputStack.push(individualElem);
            }
            else {
                let tempLength = this.tempStack.length;
                if (tempLength == 0) {
                    this.tempStack.push(individualElem);
                }
                else {
                    let tLength = tempLength;
                    while (this.findCompareValue(individualElem) <= this.findCompareValue(this.tempStack[tLength - 1])) {
                        // let compareElement = this.tempStack[tLength - 1];
                        this.replaceHigherOperator(individualElem);
                        tLength = this.tempStack.length;
                    }
                    this.tempStack.push(individualElem);
                }

            }

        });
        while (this.tempStack.length != 0) {
            let elem = this.tempStack.pop();
            this.outputStack.push(elem);
        }
        return this.outputStack;
    }
}

export default PostfixEquation;