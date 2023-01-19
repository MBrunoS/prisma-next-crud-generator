export const list = (modelName: string) => {
  const modelNameLower = modelName.toLowerCase();

  return `
  import React from 'react'
  import { prisma } from '../../lib/prisma';
  
  export default function ${modelName}Index({ ${modelNameLower}s }) {
    return (
      <div>
        <h1>All ${modelName}s</h1>
        <ul>
          {${modelNameLower}s.map((${modelNameLower}) => (
            <li key={${modelNameLower}.id}>
              <a href={\`${modelNameLower}s/\${${modelNameLower}.id}\`}>
                {${modelNameLower}.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  export async function getServerSideProps() {
    const ${modelNameLower}s = await prisma.${modelNameLower}.findMany();
    return { props: { ${modelNameLower}s } }
  }
  `;
};
