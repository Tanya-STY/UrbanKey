import React, { useState } from 'react';

 const DropdownMenu = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState('');

   const options = [
     { label: 'Sky Lounge', value: 'Sky Lounge' },
     { label: 'Spa & Fitness', value: 'Spa & Fitness' }
   ];

   const handleToggle = () => {
     setIsOpen(!isOpen);
   };

   const handleSelect = (value) => {
     setSelectedOption(value);
     setIsOpen(false);
   };

   return (
     <div className="dropdown">
       <div className="dropdown-header" onClick={handleToggle}>
         {selectedOption || 'Choose facility'}
       </div>
       {isOpen && (
         <ul className="dropdown-list">
           {options.map((option, index) => (
             <li key={index} onClick={() => handleSelect(option.value)}>
               {option.label}
             </li>
           ))}
         </ul>
       )}
     </div>
   );
 };

 export default DropdownMenu;