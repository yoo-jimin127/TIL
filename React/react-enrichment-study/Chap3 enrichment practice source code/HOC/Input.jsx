import React from 'react'
import WithLoading from './WithLoading'

function Input() {
  return <input defaultValue="input" />
}

export default WithLoading(Input);
