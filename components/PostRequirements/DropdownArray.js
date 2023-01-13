import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const DropdownArray = (props) => {
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
    deleteData: (index) => {
      let filterData = props.postRData.filter((ele, i) => {
        return i !== index;
      });
      props.onDelete(filterData);
    },
  };

  return (
    <div className="col-12 col-md-4 mb-3 mb-md-0">
      <p className="mb-2 font-12x" id="secondry-text">
        {props.label}
      </p>
      <OutsideClickHandler onOutsideClick={fn.closeDropdown}>
        <div className="postr_input">
          <input
            type={props.type}
            className={props.className}
            placeholder={props.placeholder}
            // value={props.postRData}
            // onChange={fn.eventHandle}
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
              brand 1
            </p>
            <p
              className="mb-0"
              onClick={(e) => {
                //setSelectedItem(e.target.innerText);
                props.setPostRData(e.target.innerText);
                fn.closeDropdown();
              }}
            >
              brand 2
            </p>
          </div>
        )}
      </OutsideClickHandler>

      {props?.postRData?.length !== 0 && (
        <div className="d-flex mt-3 flex-wrap">
          {props?.postRData?.map((item, i) => {
            return (
              <>
                <div className="selected-category me-3 mb-3" key={i}>
                  <p className="mb-0">{item}</p>
                  <button
                    onClick={() => {
                      fn.deleteData(i);
                    }}
                    className="cancel-option"
                  >
                    <img src="/images/cancel.svg" />
                  </button>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownArray;
