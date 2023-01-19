export const dashboard = (modelsNames: string[]) => {
  const resourcesList = modelsNames.reduce((result, modelName) => {
    const modelNameLower = modelName.toLowerCase();
    return (
      result +
      `
      <tr>
        <td>
          <a href="${modelNameLower}s">${modelName}s</a>
        </td>
      </tr>
`
    );
  }, '');

  return `
  import React from 'react'
  
  export default function Dashboard() {
    return (
      <div>
        <h1>Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>Resource</th>
            </tr>
          </thead>
          <tbody>
            ${resourcesList}
          </tbody>
        </table>
      </div>
    )
  }
  `;
};
