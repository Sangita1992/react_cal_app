import './App.css'
import { calculatorButtons } from '../src/data/calculator-bonus-03-button-data.js'
import { useEffect, useState } from 'react';

function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [memoryValue, setMemoryValue] = useState(0);
  const handleButtonClick = (btnInput) => {
    const { type, value } = btnInput;

    switch (type) {
      case "number":
      case "decimal":
        if (currentInput === "0" && value === ".") {
          // Allow decimal after the leading zero
          setCurrentInput("0.");
        } else if (currentInput === "0" && value !== ".") {
          // Replace the leading zero with the pressed value (excluding decimal)
          setCurrentInput(value);
        } else {
          // If currentInput is undefined or null, default to an empty string
          setCurrentInput((prevInput) => {
            const inputString = prevInput || ""; // Ensure it's a string
            if (value === "." && inputString.split(/[+\-*/]/).pop().includes(".")) {
              return prevInput; // Prevent adding another decimal to the current number
            }
            return inputString + value;
          });
        }
        break;

      case "clear":
        //check if value is 'all clear' to reset, else delete last element
        setCurrentInput(value === "All Clear" ? "" : currentInput.slice(0, -1));
        break;
      case "operator":
        // Prevent multiple consecutive operators
        const lastInput = currentInput[currentInput.length - 1];
        if (currentInput) {
          if (lastInput === value) {
            return;
          }
          // If the last input is an operator, replace it with the new one
          if (['+', '-', '*', '/'].includes(lastInput)) {
            setCurrentInput((prevInput) => prevInput.slice(0, -1) + value);

          } else {
            // Otherwise, just append the operator
            setCurrentInput((prevInput) => prevInput + value);
          }
        }
        break;
      case "enter":
        if (currentInput) setCurrentInput(eval(currentInput));
        break;
      case "percent":
        if (currentInput) {
          setCurrentInput((prevInput) => parseFloat(prevInput) / 100);
        }
        break;
      case "sqrt":
        //check if currentInput non-negative number
        if (currentInput && currentInput > 0) {
          setCurrentInput((prevInput) => Math.sqrt(parseFloat(prevInput)).toString());
        }
        break;
      case "sign":
        if (currentInput) {
          setCurrentInput((prevInput) => (parseFloat(prevInput) * -1).toString())
        }
        break;
      case 'memory':
        if (value === 'Memory Save') {
          setMemoryValue(parseFloat(currentInput));
          setCurrentInput('');
        }
        else if (value === "Memory Recall") {
          setCurrentInput(memoryValue.toString())
        }
        else if (value === "Memory Clear") {
          setMemoryValue(0);
        }
        else if (value === 'Memory Subtract') {
          setMemoryValue(prevInput => prevInput - parseFloat(currentInput)); // Add current input to memory
          setCurrentInput("");
        }
        else if (value === "Memory Addition") {
          setMemoryValue(prevInput => prevInput + parseFloat(currentInput)); // Subtract current input from memory
          setCurrentInput("");

        }
        break;

      default:
        break;
    }
  }

  useEffect(()=>{console.log(currentInput)},[currentInput]);

  return (
    <div className='min-h-screen bg-stone-800 py-[25px]'>
      <div className="w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] m-auto rounded-lg border border-1 border-[white] p-3">
        <div className="text-right text-2xl mb-4 p-4 bg-gray-200 rounded-lg h-16">
          {currentInput || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {calculatorButtons.map((button) => (
            <button
              key={button.className}
              style={{ backgroundColor: button.color }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#858585'}  // Change on hover
              onMouseLeave={(e) => e.target.style.backgroundColor = button.color}
              className={`p-4 text-xl rounded hover:bg-[blue] ${button.text === "=" ? "col-span-2" : ""}`}
              onClick={() => handleButtonClick(button)}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default App
