import React, { useState } from 'react';
import './PropertyProfileManagement.css';

import RegistrationKey from '../RegistrationKey/RegistrationKey';

const interiorFeatures = [
  'ADSL', 'Alarm', 'Balcony', 'Built-in Kitchen', 'Barbecue', 
  'Furnished', 'Laundry Room', 'Air Conditioning', 'Wallpaper', 
  'Dressing Room', 'Video Intercom', 'Jacuzzi', 'Shower', 
  'TV Satellite', 'Laminate', 'Panel Door', 'Marble Floor', 
  'Blinds', 'Sauna', 'Parent Bathroom', 'Parquet', 'Satin Plaster', 
  'Satin Color', 'Ceramic Floor', 'Spotlight', 'Fireplace', 
  'Terrace', 'Cloakroom', 'Underfloor Heating', 'Double Glazing'
];

const externalFeatures = [
  'Elevator', 'Doorman', 'Tennis Court', 'Gardened', 'Car Park', 
  'Fire Escape', 'Fitness', 'Playground', 'Swimming Pool', 
  'Security', 'PVC', 'Football Field', 'Thermal Insulation', 
  'Siding', 'Basketball Field', 'Generator', 'Water Tank', 'Market'
];

const AdvertiseFeatures = ({onSaveSelectedInteriorFeatures, onSaveSelectedExteriorFeatures, selectedInteriorFeatures, selectedExteriorFeatures}) => {
  const [checkedInterior, setCheckedInterior] = useState(new Array(interiorFeatures.length).fill(false));
  const [checkedExterior, setCheckedExterior] = useState(new Array(externalFeatures.length).fill(false));

  const handleInteriorChange = (position) => {
    const updatedCheckedState = checkedInterior.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedInterior(updatedCheckedState);
    const selectedInterior = interiorFeatures.filter((_, index) => updatedCheckedState[index]);
    onSaveSelectedInteriorFeatures(selectedInterior);
  };

  const handleExteriorChange = (position) => {
    const updatedCheckedState = checkedExterior.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedExterior(updatedCheckedState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedInteriorFeatures = interiorFeatures.filter((_, index) => checkedInterior[index]);
    const selectedExteriorFeatures = externalFeatures.filter((_, index) => checkedExterior[index]);
    console.log("Selected interior features:", selectedInteriorFeatures);
    console.log("Selected exterior features:", selectedExteriorFeatures);
  };

  return (
    <div className="advertise-features">
      <h2>Advertise Features</h2>
      {/* <form onSubmit={handleSubmit}> */}
        <div className="feature-section">
          <h3>Interior Features</h3>
          <div className="features-grid">
            {interiorFeatures.map((feature, index) => (
              <label key={`interior-${index}`} className="feature-checkbox">
                <input
                  type="checkbox"
                  id={`interior-checkbox-${index}`}
                  name={feature}
                  checked={checkedInterior[index]}
                  onChange={() => handleInteriorChange(index)}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
        <div className="feature-section">
          <h3>External Features</h3>
          <div className="features-grid">
            {externalFeatures.map((feature, index) => (
              <label key={`exterior-${index}`} className="feature-checkbox">
                <input
                  type="checkbox"
                  id={`exterior-checkbox-${index}`}
                  name={feature}
                  checked={checkedExterior[index]}
                  onChange={() => handleExteriorChange(index)}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button" onClick={openPopup}>
          Send Registration Keys
        </button>
        {showPopup && <RegistrationKey onClose={closePopup}/>}
      </form>
    </div>
  );
};

export default AdvertiseFeatures;