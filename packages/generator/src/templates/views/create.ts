import { DMMF } from '@prisma/generator-helper';

export const create = (modelName: string, fields: DMMF.Field[]) => {
  const modelNameLower = modelName.toLowerCase();

  const state = fields.reduce((result, field) => {
    if (field.isId || field.relationName) return result;

    return result + `${field.name}: '',`;
  }, '');

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

  export default function ${modelName}Create() {
    const [formState, setFormState] = useState({ ${state} })

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      fetch('/api/${modelNameLower}s', {
        method: 'POST',
        body: JSON.stringify(formState)
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        if (response) {
          alert('User created!')
        }
      });
    }

    return (
      <div>
        <h1>Create ${modelName}</h1>
        <form onSubmit={handleSubmit}>
          ${fieldsInput}
          <button type='submit'>Create</button>
        </form>
      </div>
    )
  }
  `;
};
