import BudgetTable from "./components/BudgetTable";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <h3>Welcome to the Budget Manager web app!</h3>
      <p>
        Add expenditures and keep an eye on your budget&apos;s balance here.
      </p>
      <BudgetTable></BudgetTable>
    </div>
  );
}

export default App;
