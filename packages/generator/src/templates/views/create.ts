import { DMMF } from '@prisma/generator-helper';
import { capitalize } from '../../utils/capitalize';

export const create = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase();

  const state = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result;

    return result + `${field.name}: "",`;
  }, '');

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

  export default function ${modelName}Create() {
    const [formState, setFormState] = useState({ ${state} })
    const router = useRouter();

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      fetch("/api/${modelNameLower}s", {
        method: "POST",
        body: JSON.stringify(formState)
      })
      .then((res) => {
        if (res.ok) {
          alert("${modelName} created!")
          router.push("/${modelNameLower}s")
        }
      });
    }

    return (
      <>
        <header>
          <h1>Create ${modelName}</h1>
        </header>
        <form onSubmit={handleSubmit}>
          ${fieldsInput}
          <footer>
            <button type="submit" className="primary-btn">Create</button>
            <a href="/${modelNameLower}s" className="secondary-btn">Return to ${modelNameLower}s list</a>
          </footer>
        </form>
      </>
    )
  }
  `;
};
