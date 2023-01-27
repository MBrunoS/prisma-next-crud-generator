import { DMMF } from '@prisma/generator-helper';
import { capitalize } from '../..//utils/capitalize';

export const edit = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase();

  const fieldsInput = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result;

    return (
      result +
      `<div>
        <label htmlFor="${field.name}">${capitalize(field.name)}:</label>
        <input
          type="text"
          id="${field.name}"
          value={formState.${field.name}}
          onChange={e => setFormState({ ...formState, ${
            field.name
          }: e.target.value })}
        />
      </div>`
    );
  }, '');

  return `
  import React, { FormEvent, useState } from "react"
  import { useRouter } from "next/router";

  export default function ${modelName}Edit({${modelNameLower}}) {
    const [formState, setFormState] = useState(${modelNameLower});
    const router = useRouter();

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      fetch(\`/api/${modelNameLower}s/\${${modelNameLower}.id}\`, {
        method: "PUT",
        body: JSON.stringify(formState)
      })
      .then((res) => {
        if (res.ok) {
          alert("${modelName} updated!");
          router.push(\`/${modelNameLower}s/\${${modelNameLower}.id}\`)
        }
      });
    }

    return (
      <>
        <header>
          <h1>Edit ${modelName}</h1>
        </header>
        <form onSubmit={handleSubmit}>
          ${fieldsInput}
          <footer>
            <button type="submit" className="primary-btn">Update</button>
            <a href="/${modelNameLower}s" className="secondary-btn">Return to ${modelNameLower}s list</a>
          </footer>
        </form>
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
