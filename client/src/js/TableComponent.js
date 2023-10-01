import React from 'react';

const TableComponent = ({ data }) => {
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  };

  const evenRowStyle = {
    backgroundColor: '#373d4e',
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>ContainerId</th>
          <th style={cellStyle}>Position</th>
          <th style={cellStyle}>Weight</th>
          <th style={cellStyle}>LoadingDate</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} style={index % 2 === 0 ? evenRowStyle : {}}>
            <td style={cellStyle}>{item.ContainerId}</td>
            <td style={cellStyle}>{item.Position}</td>
            <td style={cellStyle}>{item.Weight}</td>
            <td style={cellStyle}>{item.LoadingDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
