import React, { Component } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import LoginAction from '../../actions/LoginAction';
import { Redirect } from 'react-router-dom';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      redirect: null,
      error: null
    };
  }

  componentWillMount() {
    if(localStorage.getItem('TOKEN')) {
      this.setState({redirect: <Redirect to={"/projects"} />})
      window.location.reload();
    }
  }

  sendForm(e) {
    e.preventDefault();
    const data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    };
    LoginAction(data)
      .then((response) => {
      console.log('successful sign in!');
      localStorage.setItem('USER_ID', btoa(response.id));
      this.setState({isAuthenticated: true, redirect: <Redirect to={"/projects"} />});
      window.location.reload();
    }).catch(err => {
      console.log('error signing in: ', err);
      this.setState({error:
          <Alert color="danger">
            You have entered an invalid username or password
          </Alert>})
      localStorage.clear();
    });
  }



  render() {

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <form onSubmit={e => this.sendForm(e)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="username" placeholder="Username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </form>
                    { this.state.redirect }
                  </CardBody>
                  { this.state.error }
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button href="#/register" color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default Login;