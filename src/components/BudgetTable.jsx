import { useState } from "react";

function BudgetTable() {
  const [budgets, setBudgets] = useState([
    { id: 0, name: "Groceries", budgeted: 500.0, spent: 0.0, remaining: 500.0 },
    { id: 1, name: "Clothes", budgeted: 100.0, spent: 80.0, remaining: 20.0 },
    { id: 2, name: "Rent", budgeted: 700.0, spent: 700.0, remaining: 0.0 },
    { id: 3, name: "Cat Food", budgeted: 50.0, spent: 0.0, remaining: 0.0 },
    { id: 4, name: "Petrol", budgeted: 90.0, spent: 95.0, remaining: -5 },
    { id: 5, name: "Gym", budgeted: 20, spent: 0.0, remaining: 0.0 },
  ]);

  const [rowIdBeingEdited, setRowIdBeingEdited] = useState(null);

  const budgetedTotal = budgets.reduce(
    (accumulator, budgets) => accumulator + Number(budgets.budgeted),
    0
  );

  const totalSpent = budgets.reduce(
    (accumulator, budget) => accumulator + Number(budget.spent),
    0
  );

  const totalRemaining = budgets.reduce(
    (accumulator, budget) => accumulator + Number(budget.remaining),
    0
  );

  function handleNameInput(budgetToUpdate, newName) {
    const newBudgets = budgets.map((budget) => {
      if (budget.id === budgetToUpdate.id) {
        return {
          ...budget,
          name: newName,
        };
      } else {
        return budget;
      }
    });
    setBudgets(newBudgets);
  }

  function handleBudgetedInput(budgetToUpdate, newBudgeted) {
    const newBudgets = budgets.map((budget) => {
      if (budget.id === budgetToUpdate.id) {
        return {
          ...budget,
          budgeted: newBudgeted,
          remaining: Number(newBudgeted) - budget.spent,
        };
      } else {
        return budget;
      }
    });
    setBudgets(newBudgets);
  }

  function handleSpentInput(budgetToUpdate, newSpentValue) {
    const newBudgets = budgets.map((budget) => {
      if (budget.id === budgetToUpdate.id) {
        return {
          ...budget,
          spent: newSpentValue,
          remaining: budget.budgeted - Number(newSpentValue),
        };
      } else {
        return budget;
      }
    });
    setBudgets(newBudgets);
  }

  function addRow() {
    const id = budgets.length;
    setBudgets([
      ...budgets,
      {
        id,
        name: "",
        budgeted: 0.0,
        spent: 0.0,
        remaining: 0.0,
      },
    ]);
    setRowIdBeingEdited(id);
  }

  // check if expenditure is more than 80% of budget for item
  function eightyPercent(num) {
    return (num / 100) * 80;
  }

  function handleKeyDownStopEditingRow(e) {
    if (e.key === "Enter") {
      setRowIdBeingEdited(null);
    }
  }

  function editRow(budget) {
    setRowIdBeingEdited(budget.id);
  }

  function deleteRow(budgetToDelete) {
    const newBudgets = budgets.filter(
      (budget) => budget.id !== budgetToDelete.id
    );
    setBudgets(newBudgets);
  }

  return (
    <div className="table-responsive-md">
      <div className="p-5">
        <button type="button" className="btn btn-success p-" onClick={addRow}>
          + Add Budget
        </button>
        <table className="table table-hover table-borderless">
          <thead>
            <tr>
              <th scope="col">Budget</th>
              <th scope="col">Budgeted</th>
              <th scope="col">Spent</th>
              <th scope="col">Remaining</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr
                className={
                  budget.spent > eightyPercent(budget.spent)
                    ? "table-danger"
                    : ""
                }
                key={budget.id}
              >
                <td>
                  {budget.id === rowIdBeingEdited ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name"
                      value={budget.name}
                      onChange={(e) => handleNameInput(budget, e.target.value)}
                      onKeyDown={handleKeyDownStopEditingRow}
                    />
                  ) : (
                    budget.name
                  )}
                </td>
                <td>
                  {" "}
                  {budget.id === rowIdBeingEdited ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="budgeted"
                      value={budget.budgeted}
                      onChange={(e) =>
                        handleBudgetedInput(budget, e.target.value)
                      }
                      onKeyDown={handleKeyDownStopEditingRow}
                    />
                  ) : (
                    "£" + budget.budgeted
                  )}
                </td>
                <td>
                  {" "}
                  {budget.id === rowIdBeingEdited ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="spent"
                      value={budget.spent}
                      onChange={(e) => handleSpentInput(budget, e.target.value)}
                      onKeyDown={handleKeyDownStopEditingRow}
                    />
                  ) : (
                    "£" + budget.spent
                  )}
                </td>
                <td> {"£" + budget.remaining}</td>
                <td>
                  <span className="pr-2">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        editRow(budget);
                      }}
                    >
                      Edit
                    </button>
                  </span>
                  <span>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => deleteRow(budget)}
                    >
                      Delete
                    </button>
                  </span>
                </td>
              </tr>
            ))}
            <tr></tr>
            <tr>
              <th scope="row">Total</th>
              <td>£{budgetedTotal}</td>
              <td>£{totalSpent}</td>
              <td
                className={totalRemaining > 0 ? "text-success" : "text-danger"}
              >
                £{totalRemaining}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BudgetTable;
