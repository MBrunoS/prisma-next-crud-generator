export const select = `
'use client'
import React from 'react'
import ReactSelect, { GroupBase, Props } from 'react-select'

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group> & { label: string },
) => {
  return <>
    <label
      htmlFor={props.id?? props.name}
      className="block text-xs font-medium text-gray-700"
    >
      {props.label}
      {props.required && (
        <>
          &nbsp;<span className="font-bold text-secondary">*</span>
        </>
      )}
    </label>
    <ReactSelect id={props.id?? props.name} {...props} />
  </>
}
`
