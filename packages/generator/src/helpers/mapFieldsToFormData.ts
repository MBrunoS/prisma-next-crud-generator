import { DMMF } from '@prisma/generator-helper'
import { IGNORED_FIELDS } from '../utils/ignoredFields'
import { singularize } from '../utils/strings'

const typeMap = {
  String: 'string',
  Int: 'number',
  BigInt: 'number',
  Float: 'number',
  Decimal: 'number',
}

export function mapFieldsToFormData(
  fields: DMMF.Field[],
  models: DMMF.Model[],
  isEditForm = false,
) {
  return fields
    .filter(
      (field) =>
        !isRelationScalar(field, fields) &&
        !IGNORED_FIELDS.includes(field.name),
    )
    .reduce((result, field) => {
      const formDataValue = `formData.get('${field.name}')`
      if (field.kind === 'object') {
        return (
          result +
          generateObjectField(
            field,
            formDataValue,
            field.isList,
            isEditForm,
            models,
          )
        )
      }

      if (field.type === 'Boolean') {
        return result + generateBooleanField(field, formDataValue)
      }

      if (field.type === 'DateTime') {
        return result + generateDateTimeField(field, formDataValue)
      }

      const type = typeMap[field.type as keyof typeof typeMap]

      if (!type) return result

      return result + generateDefaultField(field, formDataValue, type)
    }, '')
}

function generateObjectField(
  field: DMMF.Field,
  formDataValue: string,
  isList: boolean,
  isEditForm: boolean,
  models: DMMF.Model[],
) {
  return isList
    ? handleListField(field, formDataValue, isEditForm, models)
    : handleSingleField(field, formDataValue, isEditForm, models)
}

function handleListField(
  field: DMMF.Field,
  formDataValue: string,
  isEditForm: boolean,
  models: DMMF.Model[],
) {
  const isRelationRequiredFromOtherSide = models
    .find((model) => model.name === field.type)
    ?.fields.find(
      (f) =>
        !f.isList && f.relationName && f.relationName === field.relationName,
    )?.isRequired

  const relationIdFieldType = models
    .find((model) => model.name === field.type)
    ?.fields.find((f) => f.name === 'id')?.type
  const type = typeMap[relationIdFieldType as keyof typeof typeMap]
  const isRelationIdNumber = type === 'number'

  const connectValue = `{
    connect: formData.getAll('${field.name}').map(${singularize(
      field.name,
    )}Id => ({ id: ${
      isRelationIdNumber
        ? `Number(${singularize(field.name)}Id)`
        : `${singularize(field.name)}Id as ${type}`
    }}))
  }`

  const editFormValue = isRelationRequiredFromOtherSide
    ? '{ deleteMany: {} }'
    : '{ set: [] }'

  return `${field.name}: ${formDataValue} != '' ? ${connectValue} : ${
    isEditForm ? editFormValue : '{}'
  },\n`
}

function handleSingleField(
  field: DMMF.Field,
  formDataValue: string,
  isEditForm: boolean,
  models: DMMF.Model[],
) {
  const relationIdFieldType = models
    .find((model) => model.name === field.type)
    ?.fields.find((f) => f.name === 'id')?.type
  const type = typeMap[relationIdFieldType as keyof typeof typeMap]
  const isRelationIdNumber = type === 'number'

  return `${field.name}: ${formDataValue} != '' ? { connect: { id: ${
    isRelationIdNumber
      ? `Number(${formDataValue})`
      : `${formDataValue} as ${type}`
  } } } : ${isEditForm ? '{ disconnect: true }' : '{}'},\n`
}

function generateBooleanField(field: DMMF.Field, formDataValue: string) {
  return `${field.name}: ${formDataValue} === 'on',\n`
}

function generateDateTimeField(field: DMMF.Field, formDataValue: string) {
  return `${field.name}: new Date(${formDataValue} as string).toISOString(),\n`
}

function generateDefaultField(
  field: DMMF.Field,
  formDataValue: string,
  type: string,
) {
  return `${field.name}: ${formDataValue} as ${type},\n`
}

function isRelationScalar(field: DMMF.Field, fields: DMMF.Field[]) {
  return (
    field.kind === 'scalar' &&
    fields.some((f) => f.relationFromFields?.includes(field.name))
  )
}
