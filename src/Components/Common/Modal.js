import React, { useEffect, useRef } from "react";
import * as PropTypes from "prop-types";

export default function Modal ({isHidden, children, wrapperId, modalId, onClose}) {
  const _modal = useRef();

  useEffect( () => {
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('keyup', handleKeyboardClick);

    return () => {
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('keyup', handleKeyboardClick);
    };
  }, []);

  const handleMouseClick = e => {
    if (e.target === _modal.current) {
      onClose();
    }
  };

  const handleKeyboardClick = e => {
    if (e.key === 'Escape') {
      if (_modal.current.className === 'modal show') {
        onClose();
      }
    }
  };

  return (
    <div ref={_modal}
         id={wrapperId}
         className={"modal " + (isHidden ? "hide" : "show")}>
      <div id={modalId} className="modal-content animated fadeIn">
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};