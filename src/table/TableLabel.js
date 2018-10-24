import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { LABEL_WIDTH } from "./constants";

const StyledTableLabel = styled.div`
  display: flex;
  box-sizing: border-box;

  .etb-values {
    display: flex;

    .etb-column {
      color: #3b495e;
      border-right:  1px solid #dbdbdb;
      border-bottom:  1px solid #dbdbdb;

      &:first-child {
        border-left:  1px solid #dbdbdb;
      }
    }
  }

  .etb-label {
    display: flex;
    align-items: center;
    text-align: left;
    font-weight: bold;
    color: #3b495e;
    min-width: ${LABEL_WIDTH}px;
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
