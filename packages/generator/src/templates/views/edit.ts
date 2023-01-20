import { DMMF } from '@prisma/generator-helper';

export const edit = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase();

  const fieldsInput = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result;

    return (
      result +
      `<div>
        <label htmlFor='${field.name}'>${field.name}:</label>
        <input
          type='text'
          id='${field.name}'
          value={formState.${field.name}}
          onChange={e => setFormState({ ...formState, ${field.name}: e.target.value })}
        />
      </div>`
    );
  }, '');

  return `
  import React, { FormEvent, useState } from 'react'
  import { useRouter } from 'next/router';

  export default function ${modelName}Edit({${modelNameLower}}) {
    const [formState, setFormState] = useState(${modelNameLower});
    const router = useRouter();

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      fetch(\`/api/${modelNameLower}s/\${${modelNameLower}.id}\`, {
        method: 'PUT',
        body: JSON.stringify(formState)
      })
      .then((res) => {
        if (res.ok) {
          alert('${modelName} updated!');
          router.push(\`/${modelNameLower}s/\${${modelNameLower}.id}\`)
        }
      });
    }

    return (
      <div>
        <h1>Edit ${modelName}</h1>
        <form onSubmit={handleSubmit}>
          ${fieldsInput}
          <button type='submit'>Update</button>
        </form>
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
