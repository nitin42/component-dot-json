import { createElement } from 'react'
import ReactHtmlParser from 'react-html-parser'
import isHtml from 'is-html'

/**

TODO:
  * Gracefully handle the errors
  * handlers
  * State

*/

let key = 0

// Get the required data from the JSON schema
const getData = (schema) => ({
  name: schema.name,
  type: schema.type,
  props: schema.props,
})

/**
 * Render the html elements
 */
const createFromHtml = (children) => {
  // This helps us avoid dangerouslySetInnerHtml
  const { type, props } = ReactHtmlParser(children)[0]

  key++
  return createElement(type, { key, ...props }, recurseChildren(props.children))
}

/**
 * Recursively render the children
 */
const recurseChildren = (child) => {
  if (isHtml(child)) {
    return createFromHtml(child)
  }
  
  return child
}

const traverse = (child) => recurseChildren(child)

/**
 * @param {*} children Children array
 */
const renderChildren = (children) => {
  return children.map(child => {
    if (typeof child === 'object') {
      // Use recursion to resolve the children again
      return creator(child)
    }
    
    return traverse(child)
  })
}

/**
 * @param {*} where Component name
 */
const throwError = (where) => {
  throw new Error(
    `property 'children' should be an array in component '${where}'.`
  )
}

/**
 * Resolves children array (if any) of the root element
 * @param {*} msg Corresponds to the component name, used in error reporting.
 * @param {*} props Component props
 */
const resolveChildren = (msg, props) => {
  return props.children && Array.isArray(props.children)
  ? renderChildren(props.children)
  : props.children && !Array.isArray(props.children) ? throwError(msg) : null
}

/**
 * Create React element from JSON
 * @param {*} name Component name
 * @param {*} type Element type
 * @param {*} props Component props
 */
const createReactElement = (name, type, props) => {
  key++

  return createElement(
    type,
    { ...props, key },
    resolveChildren(name, props)
  )
}

export const creator = (schema) => {
  // Root element name, type and props
  const { name, type, props } = getData(schema)

  return createReactElement(name, type, props)
}
