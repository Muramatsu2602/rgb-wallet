import { React, useContext } from "react";
import "./styles.css";

import { Button, useAccordionToggle, AccordionContext } from "react-bootstrap/";

export default function ContextAwareToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <button
      type="button"
      className="custom-aware-toggle-btn"
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}
