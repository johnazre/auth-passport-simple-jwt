import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Container, Row, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'

class Login extends Component {

  render() {
    return (
      <Container>
        <Row style={{marginTop: '23%'}}>
          <Col lg={{ size: 6, offset: 3 }} style={{ border: '1px solid #c9c5c2', padding: 35, boxShadow: "3px 3px 47px 0px rgba(0,0,0,0.5)"}}>
            <Form onSubmit={this.props.handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Field className="form-control" name="email" component="input" type="text" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Field className="form-control" name="password" component="input" type="text" />
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login = reduxForm({
  // a unique name for the form
  form: 'login'
})(Login)

export default Login
