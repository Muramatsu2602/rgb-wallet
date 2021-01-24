import React from 'react';
import { Button,useAccordionToggle } from "react-bootstrap/";


/**
 * Custom Toggle Button to Collapse/Show Password Accordeon
 * @param {*} param0
 */
export default function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log("totally custom!")
    );
  
    return (
      <Button
        className="custom-btn-small"
        onClick={decoratedOnClick}
        // disabled={status}
      >
        {children}
      </Button>
    );
  }
  