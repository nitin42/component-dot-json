import React from 'react'
import renderer from 'react-test-renderer'

import { createComponent } from '../src'

import root from './samples/root.json'
import html from './samples/html.json'
import nested from './samples/nested.json'
import tree from './samples/Tree.json'
import multiple from './samples/multiple.json'
import whole from './samples/whole.json'
import customComp from './samples/customComponent.json'

const Header = (props) => <div>Header {props.children}</div>
const components = {
  Header
}

const RootComp = createComponent(root)
const HtmlComp = createComponent(html)
const NestedComp = createComponent(nested)
const CompTree = createComponent(tree)
const MultComp = createComponent(multiple)
const CustomComp = createComponent(customComp, components)
const WholeComp = createComponent(whole, components)

describe('Component-dot-json', () => {
  it('should parse the root element', () => {
    const tree = renderer.create(<RootComp />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render the html elements', () => {
    const tree = renderer.create(<HtmlComp />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render the nested html elements', () => {
    const tree = renderer.create(<NestedComp />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render a component as a child', () => {
    const tree = renderer.create(<CompTree />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render multiple components as children', () => {
    const tree = renderer.create(<MultComp />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render components, strings and html elements', () => {
    const tree = renderer.create(<WholeComp />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render custom react component', () => {
    const tree = renderer.create(<CustomComp />).toJSON();

    expect(tree).toMatchSnapshot()
  })
})
