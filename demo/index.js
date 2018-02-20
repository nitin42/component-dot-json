import React from 'react'
import { render } from 'react-dom'

import Data from './sample.json'
import { createComponent } from '../src'
import Header from './Header'

const components = {
    Header
}

const JsonComponent = createComponent(Data, components)

render(<JsonComponent />, document.getElementById('root'))
