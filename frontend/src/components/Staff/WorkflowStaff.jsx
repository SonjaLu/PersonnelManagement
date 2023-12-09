
import React from 'react';
import { useParams } from 'react-router-dom';
import './WorkflowStaff.css';

function WorkflowStaff() {
  const { staffName } = useParams();

  return (
    <div>
    <div>
      <h2 className="headline">Workflow für {staffName}</h2>
      {/* Weitere Inhalte hier */}
    </div>
    <div className="container">
        <div className="card" style={{ '--i': '-1' }}></div>
        <div className="card" style={{ '--i': '-1' }}></div>
        <div className="card" style={{ '--i': '-1' }}></div>
        </div>
        </div>
  );
}

export default WorkflowStaff;
