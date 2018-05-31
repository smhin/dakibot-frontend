import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import { CreateUserAction } from "../../actions/UserAction";
import {Redirect} from "react-router-dom";

class Register extends Component {

  constructor() {
    super();
    this.state = {
      redirect: null,
      error: null
    };
  }

  sendForm(e) {
    e.preventDefault();
    const data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    };
    CreateUserAction(data)
      .then(() => {
        console.log('successful sign up!');
        this.setState({redirect: <Redirect to={"/login"} />})
      }).catch(err => {
      console.log('error signing up: ', err);
      this.setState({error:
          <Alert color="danger">
            You have entered an invalid password
          </Alert>})
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <form onSubmit={e => this.sendForm(e)}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="username" placeholder="Username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password" placeholder="Password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="confirmPassword" placeholder="Repeat password" />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </form>
                  <br/>
                  {this.state.redirect}
                  {this.state.error}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
