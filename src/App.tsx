import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./state";

function App() {
  const [inputAmount, setInputAmount] = useState(-1);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    let inputElem = document.getElementById("number-input") as HTMLFormElement;

    inputElem.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
      }
    });

    return () => {
      inputElem.removeEventListener("keydown", () => {});
    };
  }, []);

  const dispatch = useDispatch();

  const { depositMoney, withdrawMoney, bankrupt, noMoreThanWarning } =
    bindActionCreators(actionCreators, dispatch);

  const amount = useSelector((state: State) => state.bank);

  const handleInputAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value.replaceAll("e", "");

    setInputAmount(parseFloat(value));
  };

  const handleDeposit = () => {
    if (inputAmount < 0) {
      setWarning("Please type your desired amount of money first");

      return;
    }

    setWarning("");

    depositMoney(inputAmount);
  };

  const handleWithdraw = () => {
    if (inputAmount < 0) {
      noMoreThanWarning();

      setWarning("Please deposit your desired amount of money first");

      return;
    }

    if (inputAmount > amount) {
      noMoreThanWarning();

      setWarning("You do not have currently that amount of money to withdraw");

      return;
    }

    withdrawMoney(inputAmount);
  };

  const handleBankrupt = () => {
    if (!amount) {
      setWarning("You already no money in your bank account");

      return;
    }

    setWarning("You went bankrupt!");

    bankrupt();
  };

  return (
    <div className="App flex flex-col items-center">
      <div className="flex flex-col justify-center items-center">
        <h1>Your Balance</h1>

        <h3>{amount.toFixed(2).toString().replaceAll(".", ",")}</h3>
        <div className="flex flex-row">
          <input
            id="number-input"
            type="number"
            value={inputAmount < 0 ? "amount" : inputAmount}
            placeholder="amount.."
            onChange={handleInputAmount}
          />
        </div>
        {/* asagısının style ını handle et */}
        <h3 className={`warning ${warning ? "warning-visible" : ""}`}>
          {warning}
        </h3>
      </div>
      <div className="flex flex-row button-group">
        <button onClick={handleDeposit}>Deposit</button>
        <button className="button-withdraw" onClick={handleWithdraw}>
          Withdraw
        </button>
        <button
          disabled={amount === 0}
          className={`button-bankrupt ${
            amount === 0 ? "button-already-bankrupt" : ""
          }`}
          onClick={handleBankrupt}
        >
          Bankrupt
        </button>
      </div>
    </div>
  );
}

export default App;
