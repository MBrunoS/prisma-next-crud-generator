export const dashboard = (modelsNames: string[]) => {
  const resourcesList = modelsNames.reduce((result, modelName) => {
    const modelNameLower = modelName.toLowerCase();
    return (
      result +
      `
      <div className="row">
        <div className="cell" data-title="resource">
          <a href="${modelNameLower}s">${modelName}s</a>
        </div>
      </div>
`
    );
  }, '');

  return `
  import React from 'react'
  
  export default function Dashboard() {
    return (
      <>
        <header>
          <h1>Dashboard</h1>
        </header>
        <div className="table">
          <div className="row header">
            <div className="cell">Resource</div>
          </div>
          ${resourcesList}
        </div>
      </>
    )
  }
  `;
};
