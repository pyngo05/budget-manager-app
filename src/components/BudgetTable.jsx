import { useState } from "react";

function BudgetTable() {
  let available = 2500.0;

  const [budgets, setBudgets] = useState([
    { id: 0, name: "Groceries", budgeted: 500.0, spent: 0.0, remaining: 500.0 },
    { id: 1, name: "Clothes", budgeted: 100.0, spent: 80.0, remaining: 20.0 },
    { id: 2, name: "Rent", budgeted: 700.0, spent: 700.0, remaining: 0.0 },
  ]);

  const [rowIdBeingEdited, setRowIdBeingEdited] = useState(null);

  function getBudgetedTotal() {
    let initialValue = 0.0;
    let budgetedTotal = budgets.reduce(
      (accumulator, budgets) => accumulator + budgets.budgeted,
      initialValue
    );
    return budgetedTotal;
  }

  function getExpenditureTotal() {
    let initialValue = 0.0;
    let expenditureTotal = budgets.reduce(
      (accumulator, budgets) => accumulator + budgets.spent,
      initialValue
    );
    return expenditureTotal;
  }

  function getTotalRemaining() {
    let initialValue = 0.0;
    let expenditureTotal = budgets.reduce(
      (accumulator, budgets) => accumulator + budgets.spent,
      initialValue
    );
    available -= expenditureTotal;
    return available;
  }

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

  function addBudget(name, amount) {
    budgets[name] = amount;
    available -= amount;
  }

  function spend(name, amount) {
    if (Object.values(budgets).includes(name)) {
      const budgetIndex = budgets.findIndex((budget) => budget.name === name);
      if (budgetIndex !== -1) {
        budgets[budgetIndex].spent = amount;
        budgets[budgetIndex].remaining =
          budgets[budgetIndex].budget - budgets[budgetIndex].spent;
      }
    } else {
      console.log("No such budget!");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setRowIdBeingEdited(null);
    }
  }

  function editRow(budget) {
    setRowIdBeingEdited(budget.id);
  }

  function deleteRow(e) {
    console.log("e", e);
  }

  return (
    <div className="table-responsive-md">
      <button type="button" className="btn btn-success" onClick={addRow}>
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
                budget.spent > eightyPercent(budget.spent) &&
                budget.spent < budget.budgeted
                  ? "table-warning"
                  : budget.spent !== 0 && budget.spent >= budget.budgeted
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
                    onKeyDown={handleKeyDown}
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
                    onChange={(e) => handleNameInput(budget, e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  budget.budgeted
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
                    onChange={(e) => handleNameInput(budget, e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  budget.spent
                )}
              </td>
              <td>
                {" "}
                {budget.id === rowIdBeingEdited ? (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="remaining"
                    value={budget.remaining}
                    onChange={(e) => handleNameInput(budget, e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  budget.remaining
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    editRow(budget);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={deleteRow}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr></tr>
          <tr>
            <th scope="row">Total</th>
            <td>{getBudgetedTotal()}</td>
            <td>{getExpenditureTotal()}</td>
            <td>{getTotalRemaining()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default BudgetTable;
