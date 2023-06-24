import BudgetTable from "./components/BudgetTable";
import NavBar from "./components/NavBar";
import PieChart from "./components/PieChart";

function App() {
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
        <PieChart></PieChart>
      </div>
      <p className="d-flex flex-row pt-10">
        Rows with a red background show expenditures that are 80% or more of
        their budgeted allowance.
      </p>
      <BudgetTable></BudgetTable>
    </div>
  );
}

export default App;
