import { creator } from './utils'

// Top level function to create the component
function createComponent(schema, components) {
  const ComponentFromJson = () => creator(schema, components)

  // For debugging in react-devtools
  Object.defineProperty(ComponentFromJson, 'name', {
    value: schema.name,
    writable: true
  })

  return ComponentFromJson
}

export { createComponent }
