import { useState } from "react";

function BudgetTable({ budgets, onChangeBudgets }) {
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
    onChangeBudgets(newBudgets);
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
    onChangeBudgets(newBudgets);
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
    onChangeBudgets(newBudgets);
  }

  function addRow() {
    const id = budgets.length;
    onChangeBudgets([
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
    onChangeBudgets(newBudgets);
  }

  return (
    <div className="table-responsive-md">
      <div className="px-10 md:px-20 lg:px-80">
        <button type="button" className="btn btn-success p-1" onClick={addRow}>
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
                  <span
                    className="pr-4 btn"
                    onClick={() => {
                      editRow(budget);
                    }}
                  >
                    ✏️
                  </span>
                  <span className="btn" onClick={() => deleteRow(budget)}>
                    🗑️
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
