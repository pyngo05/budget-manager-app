import BudgetTable from "./components/BudgetTable";
import NavBar from "./components/NavBar";
import PieChart from "./components/PieChart";
import { useState } from "react";

function App() {
  const [budgets, setBudgets] = useState([
    { id: 0, name: "Groceries", budgeted: 500.0, spent: 0.0, remaining: 500.0 },
    { id: 1, name: "Clothes", budgeted: 100.0, spent: 80.0, remaining: 20.0 },
    { id: 2, name: "Rent", budgeted: 700.0, spent: 700.0, remaining: 0.0 },
    { id: 3, name: "Cat Food", budgeted: 50.0, spent: 0.0, remaining: 0.0 },
    { id: 4, name: "Petrol", budgeted: 90.0, spent: 95.0, remaining: -5 },
    { id: 5, name: "Gym", budgeted: 20, spent: 0.0, remaining: 0.0 },
  ]);

  function handleOnChangeBudgets(budgets) {
    setBudgets(budgets);
  }

  return (
    <div>
      <NavBar></NavBar>
      <p className="d-flex flex-row pt-10 justify-content-center">
        Add expenditures and keep an eye on your budget&apos;s balance here.
      </p>
      <div
        className="d-flex flex-row justify-content-center"
        style={{
          height: "50vh",
          width: "90vw",
          display: "block",
          margin: "0 auto",
        }}
      >
        <PieChart budgets={budgets}></PieChart>
      </div>
      <BudgetTable
        budgets={budgets}
        onChangeBudgets={handleOnChangeBudgets}
      ></BudgetTable>
      <p className="d-flex flex-row justify-content-center px-10 md:px-20 lg:px-80">
        Rows with a red background show expenditures that are 80% or more of
        their budgeted allowance.
      </p>
    </div>
  );
}

export default App;
