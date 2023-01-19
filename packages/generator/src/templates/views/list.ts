import { DMMF } from '@prisma/generator-helper';

export const list = ({ name: modelName, fields }: DMMF.Model) => {
  const modelNameLower = modelName.toLowerCase();

  const tableTitles = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result;

    return result + `<th>${field.name}</th>`;
  }, '');

  const tableData = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result;

    return result + `<td>{${modelNameLower}.${field.name}}</td>`;
  }, '');

  return `
  import React from 'react'
  import { prisma } from '../../lib/prisma';
  import { ${modelName} } from '@prisma/client';
  
  interface ${modelName}IndexProps {
    ${modelNameLower}s: ${modelName}[]
  }

  export default function ${modelName}Index({ ${modelNameLower}s }: ${modelName}IndexProps) {
    return (
      <div>
        <h1>All ${modelName}s</h1>
        <table>
          <thead>
            <tr>
              ${tableTitles}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {${modelNameLower}s.map((${modelNameLower}) => (
              <tr key={${modelNameLower}.id}>
                ${tableData}
                <td>
                  <a href={\`${modelNameLower}s/\${${modelNameLower}.id}\`}>
                    Show
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <a href="/">Return to Dashboard</a>
      </div>
    )
  }
  
  export async function getServerSideProps() {
    const ${modelNameLower}s = await prisma.${modelNameLower}.findMany();
    return { props: { ${modelNameLower}s } }
  }
  `;
};
