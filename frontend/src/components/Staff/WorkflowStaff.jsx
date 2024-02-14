
import React, { useContext, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './WorkflowStaff.css';
import { StaffContext } from './StaffProvider.jsx';

function WorkflowStaff() {
  const { staffName } = useParams();
  const { staffList } = useContext(StaffContext);
  const [sickDays, setSickDays] = useState(0);

  const navigate = useNavigate();
  const handleNavigateToSickDays = () => {
        navigate(`/details/${staffName}/sick`);
};

const handleNavigateToRtDays = () => {
        navigate(`/details/${staffName}/rt`);
};

const handleNavigateToVacation = () => {
  navigate(`/details/${staffName}/vacation`);
};

  useEffect(() => {
    const staff = staffList.find(staff => staff.name === staffName);
    if (staff) {
      setSickDays(staff.sickDays);
    }
  }, [staffName, staffList]);

  const handleNavigation = (type) => {
    navigate(`/details/${staffName}/${type}`);
};

  return (
    <>
    <div className="bodylike">
    <div>
    
      <h2 className="headline">Workflow für {staffName}
      </h2>
    

    <div className="container">
        <div className="cardbox" style={{ '--i': '0' }} onClick={handleNavigateToVacation}><div className="card-content" style={{ '--j': '1' }}><h2 className="h2-display">Urlaubstage</h2></div></div>
        <div className="cardbox" style={{ '--i': '1' }} onClick={handleNavigateToSickDays}><div className="card-content" style={{ '--j': '2' }}><h2 className="h2-display">Krankentage</h2>
        <p><br></br>{sickDays}</p></div></div>
        <div className="cardbox" style={{ '--i': '2' }} onClick={handleNavigateToRtDays}><div className="card-content" style={{ '--j': '3' }}><h2 className="h2-display">RT-Tage</h2></div></div>
        </div>
        </div>
        </div>
        <div className="navigation-arrow">
        <button onClick={() => navigate('/staffselector')} className="glow-on-hover">
          &#x2190; Auswahlliste
        </button>
      </div>
      </>
  );
}

export default WorkflowStaff;
