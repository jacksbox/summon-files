import React from 'react'
// import propTypes from 'prop-types'

{{#if tags.style}}
import './{{name}}.css'
{{/if}}

// use custom variable e.g. demoCutomVariable: "{{demoCutomVariable}}" defined in the options.json

{{#if subType }}
// use a subType for further specialisation of the file
{{/if}}

const {{name}} = props => (
  <div className="{{name}}"></div>
)

// {{name}}.propTypes = {}
// {{name}}.defaultProps = {}

export default {{name}}
