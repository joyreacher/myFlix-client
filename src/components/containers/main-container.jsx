import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap'
import { connect } from "react-redux";

function mainContainer (props) {
  useEffect(() => {
    document.title = `${props.title} | Cinema Barn`;
    window.scrollTo(0, 0);
  }, [props.title]);
  return <Container wide={props.wide}>{props.children}</Container>;
}

export default mainContainer;
