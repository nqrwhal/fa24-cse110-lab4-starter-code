import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses } = useContext(AppContext);
  let budget = 1000;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);
  const remaining = budget - totalExpenses;

  const alertType = remaining < 0 ? "alert-danger" : "alert-success";

  useEffect(() => {
    if (remaining < 0) {
      alert(`You have overspent your budget by $${Math.abs(remaining)}`);
    }
  }, [remaining]);


  return (
    <div className={`alert ${alertType}`}>
      <span>
        {remaining < 0 ? "Remaining: " : "Remaining: "}
        ${Math.abs(remaining)}
      </span>
    </div>
  );
};

export default Remaining;
