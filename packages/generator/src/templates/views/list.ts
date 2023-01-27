import { DMMF } from '@prisma/generator-helper';
import { capitalize } from '../../utils/capitalize';

export const list = ({ name: modelName, fields }: DMMF.Model) => {
  const modelNameLower = modelName.toLowerCase();

  const tableTitles = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result;

    return result + `<div className="cell">${capitalize(field.name)}</div>`;
  }, '');

  const tableData = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result;

    return (
      result +
      `<div className="cell" data-title="${field.name}">{${modelNameLower}.${field.name}}</div>`
    );
  }, '');

  return `
  import React from 'react'
  import { prisma } from '../../lib/prisma';
  import { ${modelName} } from '@prisma/client';
  
  interface ${modelName}IndexProps {
    ${modelNameLower}s: ${modelName}[]
  }

  export default function ${modelName}Index({ ${modelNameLower}s }: ${modelName}IndexProps) {
    function handleDelete(id: string) {
      fetch(\`/api/${modelNameLower}s/\${id}\`, { method: 'DELETE' }).then(() => {
        alert('${modelName} deleted');
        location.reload();
      });
    }

    return (
      <>
        <header>
          <h1>All ${modelName}s</h1>
          <a href="/${modelNameLower}s/create" className="secondary-btn">
            + Create new ${modelNameLower}
          </a>
        </header>
        <div className="table">
          <div className="row header">
            ${tableTitles}
            <div className="cell">Actions</div>
          </div>
          {${modelNameLower}s.map((${modelNameLower}) => (
            <div className="row" key={${modelNameLower}.id}>
              ${tableData}
              <div className="cell actions" data-title="actions">
                <div className="action-buttons">
                  <a href={\`${modelNameLower}s/\${${modelNameLower}.id}\`} className="secondary-btn small">
                    &#128065; Show
                  </a>
                  <a href={\`${modelNameLower}s/\${${modelNameLower}.id}/edit\`} className="secondary-btn small">
                    &#9998; Edit
                  </a>
                  <a href="#" onClick={() => handleDelete(${modelNameLower}.id)} className="secondary-btn small danger">
                    &#128465; Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <footer>
          <a href="/" className="secondary-btn">Return to Dashboard</a>
        </footer>
      </>
    )
  }
  
  export async function getServerSideProps() {
    const ${modelNameLower}s = await prisma.${modelNameLower}.findMany();
    return { props: { ${modelNameLower}s } }
  }
  `;
};
