import React from "react";
import PropTypes from "prop-types";
import { Toggle } from "react-powerplug";
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

const StyledCheckbox = styled.span`
  width: 18px;
  height: 18px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-right: 7px;
  border-radius: 50%;
  border: 2px solid #66aedd;
  cursor: pointer;
  
  ${p =>
    p.on &&
    `
      &:before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #66aedd;
      }
    `}
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

const StyledValues = styled.div`
  width: 100%;
  display: flex;
  ${p =>
    p.onClick &&
    `
      cursor: pointer;

      &:hover {
        .etb-column,
        .etb-label {
          background-color: #f1f1f1;
        }
      }
    `};
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
      <div className="etb-info">
        <StyledHeader>
          {!children && (
            <Toggle>
              {({ on, toggle }) => (
                <StyledCheckbox
                  on={on}
                  onClick={() => {
                    toggle();
                    onSelectItem(on, item);
                  }}
                />
              )}
            </Toggle>
          )}
          {children && (
            <button className="etb-btn" onClick={() => onExpandItem(code)}>
              {isExpanded ? "-" : "+"}
            </button>
          )}
          <StyledValues onClick={!children ? () => onClick(item) : undefined}>
            <StyledLabel className="etb-label" childLevel={childLevel}>
              {label}
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
