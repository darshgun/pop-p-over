import React, { useRef } from "react";
import Popover from "./components/Popover";

const popoverStyles = {
  flexDirection: "column",
  backgroundColor: "#FFF",
  borderRadius: "4px",
  boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.14)",
  padding: "5px"
};

export default function App() {
  /**
   * Popover settings
   */
  const popoverRef = useRef();
  const triggerRef = useRef();
  const openPopover = () => {
    popoverRef.current.openPopover(triggerRef);
  };

  return (
    <div className="App">
      <button ref={triggerRef} onClick={() => openPopover()}>
        Open popover
      </button>
      <Popover ref={popoverRef} arrow style={popoverStyles}>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </Popover>
    </div>
  );
}
