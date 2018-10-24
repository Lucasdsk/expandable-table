import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { LABEL_WIDTH } from "./constants";

const StyledTableLabel = styled.div`
  display: flex;
  box-sizing: border-box;

  .etb-label {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 5px;
    font-weight: bold;
    color: #3b495e;
    min-width: ${LABEL_WIDTH}px;
    background-color: #c6e8ff;
  }

  .etb-values {
    display: flex;
    width: 100%;

    .etb-column {
      color: #3b495e;
      border-right:  1px solid #fff;
      border-bottom:  1px solid #dbdbdb;
      background-color: #c6e8ff;

      &:first-child {
        border-left:  1px solid #fff;
      }
    }
  }
`;

const TableLabel = ({ label, labelsList }) => (
  <StyledTableLabel className="etb-row-labels">
    <div className="etb-label">{label}</div>
    <div className="etb-values">
      {labelsList.map((label, index) => (
        <div key={index} className="etb-column">
          {label}
        </div>
      ))}
    </div>
  </StyledTableLabel>
);

TableLabel.propTypes = {
  label: PropTypes.string,
  labelsList: PropTypes.array
};

export default TableLabel;
