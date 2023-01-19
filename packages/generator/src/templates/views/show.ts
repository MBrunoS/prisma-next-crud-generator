import { DMMF } from '@prisma/generator-helper';

export const show = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase();

  const fieldsList = fields.reduce(
    (result, field) =>
      result + `<p>${field.name}: {${modelNameLower}.${field.name}}</p>`,
    '',
  );

  return `
  import React from 'react'
  import { prisma } from '../../../lib/prisma';

  export default function ${modelName}Show({ ${modelNameLower} }) {
    return (
      <div>
        <h1>${modelName} {${modelNameLower}.name}</h1>
        ${fieldsList}
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
