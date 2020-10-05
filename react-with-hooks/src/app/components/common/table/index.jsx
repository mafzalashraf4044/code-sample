import React, {useState} from 'react';

//  styled components
import {
  Table,
  THead,
  Tr,
  Th,
  TBody,
  Td,
  ExpandableTr,
  ExpandableTd,
} from './styled';

export default ({
  renderColumn,
  columns,
  data,
  renderRowDetails
}) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);
  const [expandedRowIndex, setExpandedRowIndex] = useState(-1);

  return (
    <Table>
      <THead>
        <Tr>
          {
            columns.map((column, i) => (
              <Th key={i}>
                {column.title}
              </Th>
            ))
          }
        </Tr> 
      </THead>
      <TBody>
        {
          data.map((row, iRow) => (
            <React.Fragment>
              <Tr
                key={iRow}
                expanded={iRow === expandedRowIndex}
                onMouseEnter={() => setHoveredRowIndex(iRow)}
                onMouseLeave={() => setHoveredRowIndex(-1)}
              >
                {
                  columns.map((column, iCol) => (
                    <Td key={iCol}>
                      {
                        renderColumn(iCol, row, iRow === hoveredRowIndex, () => setExpandedRowIndex(expandedRowIndex === -1 ? iRow : -1))
                      }
                    </Td>
                  ))
                }
              </Tr>

              <ExpandableTr>
                <ExpandableTd colSpan={columns.length}>
                  {renderRowDetails(row, iRow === expandedRowIndex)}
                </ExpandableTd>
              </ExpandableTr>
            </React.Fragment>
          ))
        }
      </TBody> 
    </Table>
  );
};