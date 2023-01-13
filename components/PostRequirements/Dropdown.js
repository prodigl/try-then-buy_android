import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const fn = {
    openDropdown: () => {
      setIsOpen(!isOpen);
    },
    closeDropdown: () => {
      setIsOpen(false);
    },
    eventHandle: (e) => {
      const { value } = e.target;
      props.setPostRData(value);
    },
  };

  return (
    <div className="col-12 col-md-4 mb-3 mb-md-0">
      <OutsideClickHandler onOutsideClick={fn.closeDropdown}>
        <div className="postr_input">
          <input
            type={props.type}
            className={props.className}
            placeholder={props.placeholder}
            value={props.postRData}
            onChange={fn.eventHandle}
            onClick={fn.openDropdown}
          />
        </div>

        {isOpen && (
          <div className="input_options">
            <p
              className="mb-0"
              onClick={(e) => {
                //setSelectedItem(e.target.innerText);
                props.setPostRData(e.target.innerText);
                fn.closeDropdown();
              }}
            >
              cat 1
            </p>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default Dropdown;
