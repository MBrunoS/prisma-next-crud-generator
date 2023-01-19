import { DMMF } from '@prisma/generator-helper';

export const show = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase();

  const fieldsList = fields.reduce((result, field) => {
    console.log(field);

    if (field.isId || field.relationName) return result;

    return (
      result +
      `<p><strong>${field.name}:</strong> {${modelNameLower}.${field.name}}</p>`
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
      <div>
        <h1>${modelName} {${modelNameLower}.name}</h1>
        ${fieldsList}
        <a href="/${modelNameLower}s">Return to ${modelNameLower}s list</a>
      </div>
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
