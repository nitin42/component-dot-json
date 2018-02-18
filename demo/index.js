import React from 'react'
import { render } from 'react-dom'

import Data from './sample.json'
import { createComponent } from '../src'

const JsonComponent = createComponent(Data)

render(<JsonComponent />, document.getElementById('root'))
