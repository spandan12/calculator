import React, { Component } from "react";

import "./App.css";

import PostFixEquation from "./implementation/postfixEquation";
import calculateExpression from "./implementation/calculate";

import PressKey from "./components/PressKey/PressKey";
import DisplayScreen from "./components/DisplayScreen/DisplayScreen";

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: ["0"],
      output: false
    };
  }

  changeResult = keyValue => {
    const notDuplicate = ["%", "/", "*", "-", ".", "=", "+"];
    let tempResult = [];
    let compareResult = [];
    let lastElement = null;
    let length = null;
    if (this.state.output === true) {
      compareResult = ["0"];
      this.setState({
        output: false
      });
      length = compareResult.length;
      lastElement = compareResult[length - 1];
    } else {
      compareResult = [...this.state.result];
      length = compareResult.length;
      lastElement = compareResult[length - 1];
      if (lastElement === "0" && length == 1) {
        this.state.result.pop();
      }
    }

    if (keyValue === "AC") {
      tempResult = ["0"];
    } else if (
      notDuplicate.includes(keyValue) &&
      notDuplicate.includes(lastElement)
    ) {
      tempResult = [...this.state.result];
    } else if (keyValue === "=" && this.state.output == false) {
      let equation = new PostFixEquation(this.state.result);
      let postfix = equation.covertToEquation();
      let calculatedResult = calculateExpression(postfix);
      tempResult = calculatedResult;
      this.setState({
        output: true
      });
    } else if (this.state.output == false) {
      tempResult = [...this.state.result, keyValue];
    } else {
      tempResult = ["0"];
      console.log(tempResult);
    }

    this.setState({
      result: tempResult
    });
  };

  render() {
    const displayLetters = [
      "(",
      ")",
      "%",
      "AC",
      "7",
      "8",
      "9",
      "/",
      "4",
      "5",
      "6",
      "*",
      "1",
      "2",
      "3",
      "-",
      "0",
      ".",
      "=",
      "+"
    ];

    const pressKeyItems = displayLetters.map(displayLetter => (
      <PressKey
        className="press-key"
        key={displayLetter.toString()}
        value={displayLetter}
        onClick={e => this.changeResult(e.target.value)}
      ></PressKey>
    ));

    return (
      <div className="main-wrapper">
        <DisplayScreen value={this.state.result}></DisplayScreen>
        {pressKeyItems}
      </div>
    );
  }
}

export default App;
