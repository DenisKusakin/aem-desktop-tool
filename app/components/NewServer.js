import React from 'react'
import { Field, Form } from 'redux-form'
import { connect } from 'react-redux'
import {TextField} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

var renderTextField = props => (
  <TextField hintText={props.label}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />
)
//TODO: Fix
renderTextField = "input"
const renderer = (name, type) => ({value}) => <TextField name={name} type={type} value={value}/>

export default (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  
  return (
    <Form onSubmit={handleSubmit((data) => props.add(data))}>
        <div>
          <div>
            <Field name="name" component={TextField} type="text" placeholder="Name"/>
          </div>
          <div>
            <Field name="host" component={TextField} type="text" placeholder="Host"/>
          </div>
          <div>
            <Field name="login" component={TextField} type="text" placeholder="Login"/>
          </div>
          <div>
            <Field name="password" component={TextField} type="password" placeholder="Password"/>
          </div>
        </div>
    </Form>
  )
}