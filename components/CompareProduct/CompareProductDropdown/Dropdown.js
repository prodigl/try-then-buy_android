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
      props.setComparePDetails(value);
    },
  };
  return (
    <>
      <OutsideClickHandler onOutsideClick={fn.closeDropdown}>
        <div className="compareProductContainer">
          <div
            className="inputContainer d-flex justify-content-between mt-2"
            onClick={fn.openDropdown}
          >
            <span
              className={
                props.title === "Choose Sub Category"
                  ? "font-14x"
                  : "font-18x fw-bold"
              }
            >
              {props.comparePDetails === ""
                ? props.title
                : props.comparePDetails}
            </span>
            <img src="images/dropdown.svg" alt="dropdown" />
          </div>

          {isOpen && (
            <div className="inputOptionsContainer">
              <div className="inputField">
                <input
                  type="text"
                  placeholder="Search..."
                  value={props.comparePDetails}
                  onChange={fn.eventHandle}
                />
              </div>
              <div className="optionsContainer">
                <p
                  onClick={(e) => {
                    props.setComparePDetails(e.target.innerText);
                    fn.closeDropdown();
                  }}
                >
                  Category 1
                </p>
                <p
                  onClick={(e) => {
                    props.setComparePDetails(e.target.innerText);
                    fn.closeDropdown();
                  }}
                >
                  Category 2
                </p>
              </div>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default Dropdown;
