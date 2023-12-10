
import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './WorkflowStaff.css';

function WorkflowStaff() {
  const { staffName } = useParams();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`${path}/${staffName}`);
};
  return (
    <div className="bodylike">
    <div>
    
      <h2 className="headline">Workflow für {staffName}</h2>
    

    <div className="container">
        <div className="cardbox" style={{ '--i': '0' }} onClick={() => handleNavigation('/vacation')}><div className="card-content" style={{ '--j': '1' }}><h2>Urlaubstage</h2></div></div>
        <div className="cardbox" style={{ '--i': '1' }} onClick={() => handleNavigation('/sickdays')}><div className="card-content" style={{ '--j': '2' }}><h2>Krankentage</h2></div></div>
        <div className="cardbox" style={{ '--i': '2' }} onClick={() => handleNavigation('/rtdays')}><div className="card-content" style={{ '--j': '3' }}><h2>RT-Tage</h2></div></div>
        </div>
        </div>
        </div>
  );
}

export default WorkflowStaff;
