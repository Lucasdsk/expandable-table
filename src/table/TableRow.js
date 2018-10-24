import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styled from "styled-components";

import { LABEL_WIDTH, PADDING_LEFT, COLUMN_WIDTH } from "./constants";

const StyledRow = styled.div`
  width: 100%;
  padding-left: ${PADDING_LEFT}px;
  ${p => !p.hasChildren && "padding-left: 0;"}
  position: relative;

  ${p =>
    p.isExpanded &&
    p.hasChildren &&
    `
      &:before {
        content: "";
        position: absolute;
        left: 12px;
        top: 8px;
        bottom: 0;
        border-left: 1px dotted;
      }
    `}

  .etb-info {
    display: flex;
    box-sizing: border-box;
  }

  .etb-children {
    display: none;
    flex-direction: column;

    &.expanded {
      display: flex;
    }
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  .etb-btn {
    position: absolute;
    left: 2.5px;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    background-color: #66aedd;
    color: #1c4c88;
    box-shadow: 0 4px #fff, 0 -4px #fff;
  }

  .etb-checkbox {
    width: 25px;
    display: inline-block;
    flex-shrink: 0;

    input {
      margin: 0;
    }
  }

  .etb-values {
    width: 100%;
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

`;

const StyledValues = styled.div`
  width: 100%;
  display: flex;
  ${p =>
    p.onClick &&
    `
    cursor: pointer;

    &:hover {
      background-color: #f1f1f1;
    }
  `};
`;

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  color: #3b495e;
  font-weight: bold;
  flex-shrink: 0;
  padding-left: 5px;
  box-sizing: border-box;
  width: ${p => LABEL_WIDTH - p.childLevel * PADDING_LEFT}px;
`;

const TableRow = ({
  childLevel,
  code,
  label,
  item,
  valuesKeys,
  children,
  expandedItems = [],
  onClick,
  onSelectItem,
  onExpandItem
}) => {
  const isExpanded = expandedItems.includes(code);
  return (
    <StyledRow isExpanded={isExpanded} hasChildren={!!children}>
      <div className="info">
        <StyledHeader>
          {!children && (
            <span className="etb-checkbox">
              <input type="checkbox" onChange={onSelectItem} />
            </span>
          )}
          {children && (
            <button className="etb-btn" onClick={() => onExpandItem(code)}>
              {isExpanded ? "-" : "+"}
            </button>
          )}
          <StyledValues onClick={!children ? () => onClick(item) : undefined}>
            <StyledLabel childLevel={childLevel}>
              {childLevel} - {label}
            </StyledLabel>
            <div className="etb-values">
              {valuesKeys.map((key, index) => (
                <div key={index} className="etb-column">
                  {item[key] || "-"}
                </div>
              ))}
            </div>
          </StyledValues>
        </StyledHeader>
      </div>
      <div className={cx("etb-children", { expanded: isExpanded })}>
        {children &&
          children.length &&
          children.map((item, index) => (
            <TableRow
              key={index}
              childLevel={childLevel + 1}
              code={`${code}-${item.Id}`}
              item={item}
              label={item.Label}
              valuesKeys={valuesKeys}
              children={item.children}
              expandedItems={expandedItems}
              onClick={onClick}
              onSelectItem={onSelectItem}
              onExpandItem={onExpandItem}
            />
          ))}
      </div>
    </StyledRow>
  );
};

TableRow.defaultProps = {
  childLevel: 1
};

TableRow.propTypes = {
  childLevel: PropTypes.number,
  code: PropTypes.string,
  label: PropTypes.string,
  item: PropTypes.object,
  valuesKeys: PropTypes.array,
  children: PropTypes.array,
  expandedItems: PropTypes.array,
  onClick: PropTypes.func,
  onSelectItem: PropTypes.func,
  onExpandItem: PropTypes.func
};

export default TableRow;
