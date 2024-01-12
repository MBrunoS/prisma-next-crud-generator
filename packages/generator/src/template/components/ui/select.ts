export const input = `
'use client'
import React from 'react'
import ReactSelect, { GroupBase, Props } from 'react-select'

export const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group>,
) => {
  return <ReactSelect {...props} />
}
`
