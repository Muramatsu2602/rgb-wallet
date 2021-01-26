import React from 'react';
import { Button,useAccordionToggle } from "react-bootstrap/";


import "./styles.css";

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
        className="custom-toggle-btn"
        onClick={decoratedOnClick}
        // disabled={status}
      >
        {children}
      </Button>
    );
  }
  