import { DMMF } from '@prisma/generator-helper';
import { capitalize } from '../../utils/capitalize';

export const show = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase();

  const fieldsList = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result;

    return (
      result +
      `<p><strong>${capitalize(field.name)}:</strong> {${modelNameLower}.${
        field.name
      }}</p>`
    );
  }, '');

  return `
  import React from 'react'
  import { prisma } from '../../../lib/prisma';
  import { ${modelName} } from '@prisma/client';
  
  interface ${modelName}ShowProps {
    ${modelNameLower}: ${modelName}
  }

  export default function ${modelName}Show({ ${modelNameLower} } : ${modelName}ShowProps) {
    return (
      <>
        <header>
          <h1>${modelName} #{${modelNameLower}.id.substr(0,6)}...</h1>
        </header>
        <div className="card">
          ${fieldsList}
        </div>
        <footer>
          <a href="/${modelNameLower}s" className="secondary-btn">Return to ${modelNameLower}s list</a>
        </footer>
      </>
    )
  }

  export async function getServerSideProps({ params }) {
    const ${modelNameLower} = await prisma.${modelNameLower}.findUnique({
      where: { id: params.id }
    });
    return { props: { ${modelNameLower} } }
  }
  `;
};
