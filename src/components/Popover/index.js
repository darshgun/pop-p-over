import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { usePopper } from "react-popper";

import "./Popover.scss";

export const component = "popover";

export const PopoverDemo = forwardRef(
  ({ children, className, withArrow, container }, ref) => {
    const properties = {
      className: `${component} ${className}`
    };

    const [showPopper, setShowPopper] = useState(false);
    const popperRef = useRef(null);
    const [buttonRef, setButtonRef] = useState(useRef(null));
    const [arrowRef, setArrowRef] = useState(null);

    /**
     * Open popover
     */
    const open = (triggerRef) => {
      setButtonRef(triggerRef);
      setShowPopper(true);
    };

    /**
     * Close popover
     */
    const close = (triggerRef) => {
      setButtonRef(triggerRef);
      setShowPopper(false);
    };

    /**
     * Toggle popover
     */
    const toggle = (triggerRef) => {
      setButtonRef(triggerRef);
      setShowPopper(!showPopper);
    };

    /**
     * Append to document.body unless the container is defined
     */
    const appRoot = container || document.body;

    const { styles, attributes } = usePopper(
      buttonRef.current,
      popperRef.current,
      {
        placement: "bottom",
        modifiers: [
          {
            name: "arrow",
            options: {
              element: arrowRef
            }
          },
          {
            name: "offset",
            enabled: true,
            options: {
              offset: [0, 10]
            }
          }
        ]
      }
    );

    /**
     * Exposed functions
     */
    useImperativeHandle(ref, () => ({
      openPopover: (triggerRef) => open(triggerRef),
      closePopover: (triggerRef) => close(triggerRef),
      togglePopover: (triggerRef) => toggle(triggerRef)
    }));

    if (showPopper) {
      return createPortal(
        <div className={`${component}-portal`}>
          <div
            className={`${component}-overlay ${!showPopper && "d-none"}`}
            ref={ref}
            onClick={close}
          />
          {showPopper ? (
            <div
              {...properties}
              ref={popperRef}
              style={styles.popper}
              {...attributes.popper}
            >
              {withArrow && (
                <div ref={setArrowRef} style={styles.arrow} id="arrow" />
              )}
              {children}
            </div>
          ) : null}
        </div>,
        appRoot
      );
    }
    return null;
  }
);

PopoverDemo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  arrow: PropTypes.bool,
  container: PropTypes.node
};

export default PopoverDemo;
