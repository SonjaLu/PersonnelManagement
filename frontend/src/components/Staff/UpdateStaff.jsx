import React from 'react';
import './UpdateStaff.css';

function UpdateStaff({ staff, onSave, onCancel }) {
    const [updatedStaff, setUpdatedStaff] = React.useState(staff);

    const handleChange = (e) => {
        setUpdatedStaff({ ...updatedStaff, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(updatedStaff);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container">
            <form className="formpopup" onSubmit={handleSubmit}>
                <div className="staffdatapopup">
                <label>
                    Name:
                <input
                    name="name"
                    value={updatedStaff.name || ''}
                    onChange={handleChange}
                  
                />
                </label>
                <label>
                Urlaubsanspruch in Tagen:
         <input
                    type="number"
                    name="vacationEntitlement"
                    value={updatedStaff.vacationEntitlement || ''}
                    onChange={handleChange}
                    
                />
                </label>
                <label>
                Genommener Urlaub in Tagen:
    <input
        type="number"
        name="vacationTaken"
        value={updatedStaff.vacationTaken || ''}
        onChange={handleChange}
      
    />
    </label>
    <label>
    Geplanter Urlaub in Tagen:
    <input
        type="number"
        name="vacationPlanned"
        value={updatedStaff.vacationPlanned || ''}
        onChange={handleChange}
       
    />
    </label>
    <label>
    Krankheitstage:
    <input
        type="number"
        name="sickDays"
        value={updatedStaff.sickDays || ''}
        onChange={handleChange}
       
    />
    </label>
    <label>
    RT-Tage insgesamt:
    <input
        type="number"
        name="rtDays"
        value={updatedStaff.rtDays || ''}
        onChange={handleChange}
       
    />
    </label>
    <label>
    Geplante RT-Tage:
    <input
        type="number"
        name="plannedRtDays"
        value={updatedStaff.plannedRtDays || ''}
        onChange={handleChange}
        
    />
    </label>
    <label>
    Genommene RT-Tage:
    <input
        type="number"
        name="takenRtDays"
        value={updatedStaff.takenRtDays || ''}
        onChange={handleChange}
       
    />
       </label>      
                <button className="popupbtn" type="submit">Speichern</button>
                <button className="popupbtn" onClick={onCancel}>Abbrechen</button>
                </div></form>
        </div></div>
    );
}

export default UpdateStaff;
