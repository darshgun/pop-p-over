import React, { useRef } from "react";
import Popover from "./components/Popover";

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
      <Popover ref={popoverRef} withArrow>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </Popover>
    </div>
  );
}
