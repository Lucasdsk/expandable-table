import React from "react";
import PropTypes from "prop-types";
import { State } from "react-powerplug";
import styled from "styled-components";

import TableLabel from "./TableLabel";
import TableRow from "./TableRow";

import { COLUMN_WIDTH } from "./constants";

const StyledTable = styled.div`

  * {
    box-sizing: border-box;
  }

  .etb-row-group:first-child {
    .etb-row-labels {
      .etb-values {
        .etb-column {
          border-top:  1px solid #dbdbdb;
        }
      }
    }
  }
  .etb-column {
    flex: 1 0 ${COLUMN_WIDTH}px;
    padding: 10px;
    box-sizing: border-box;
  }
`;

const handleExpandItem = (items, setState) => code => {
  if (items.includes(code)) {
    setState(prevState => ({
      expandedItems: prevState.expandedItems.filter(c => c !== code)
    }));
  } else {
    setState(prevState => ({
      expandedItems: [...prevState.expandedItems, code]
    }));
  }
};

const Table = ({
  data,
  labelsList,
  valuesKeys,
  expandedItems,
  onClickItem,
  onSelectItem,
  onExpandItem
}) => (
  <State initial={{ expandedItems: [] }}>
    {({ state, setState }) => (
      <StyledTable>
        {data.map((familia, index) => (
          <div key={index} className="etb-row-group">
            <TableLabel label={familia.Label} labelsList={labelsList} />
            {familia.children.map((item, index) => (
              <TableRow
                key={index}
                code={`${familia.Id}-${item.Id}`}
                label={item.Label}
                item={item}
                valuesKeys={valuesKeys}
                expandedItems={state.expandedItems}
                children={item.children}
                onClick={onClickItem}
                onSelectItem={onSelectItem}
                onExpandItem={handleExpandItem(state.expandedItems, setState)}
              />
            ))}
          </div>
        ))}
      </StyledTable>
    )}
  </State>
);

Table.propTypes = {
  data: PropTypes.array.isRequired,
  labelsList: PropTypes.array,
  valuesKeys: PropTypes.array,
  expandedItems: PropTypes.array,
  onClickItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  onExpandItem: PropTypes.func
};

export default Table;
