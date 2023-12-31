import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalDiv({
  modalComponent, // component to render inside the modal
  component, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <div style={{ cursor: "pointer" }} onClick={onClick}>
      {component}
    </div>
  );
}

export default OpenModalDiv;
