import React, {useEffect, useState} from 'react'
import WithLoading from './WithLoading';

function Button() {
  return <button>Button</button>
}

export default WithLoading(Button);
