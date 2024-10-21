import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';



const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.toString());

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedBudget = parseFloat(newBudget);
    if (!isNaN(updatedBudget) && updatedBudget > 0) {
      setBudget(updatedBudget);
      setIsEditing(false);
    } else {
      alert('Please enter a valid budget amount');
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="form-control mr-3"
          />
          <button onClick={handleSaveClick} className="btn btn-primary">
            Save
          </button>
        </>
      ) : (
        <>
          <div>Budget: ${budget}</div>
          <button onClick={handleEditClick} className="btn btn-primary">
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Budget;
