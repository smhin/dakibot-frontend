import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Input, InputGroup, Row, Label } from 'reactstrap';
import { GetLanguageAction, GetLanguagesAction } from "../../actions/LanguageAction";
import { CreateProjectAction } from "../../actions/ProjectAction";
import { Redirect } from 'react-router-dom';
import { AppHeader } from '@coreui/react';
import MainHeader from '../../containers/DefaultLayout/MainHeader';

class CreateProject extends Component {

  constructor() {
    super();
    this.state = {
      languages: [],
      selectedLanguages: [],
      redirect: null
    }
    this.handleChangeLanguages = this.handleChangeLanguages.bind(this);
  }

  componentWillMount() {
    GetLanguagesAction()
      .then((data) => this.setState({languages: data}));
  }

  handleChangeLanguages(event) {
    const options = event.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        GetLanguageAction(options[i].id)
          .then((data) => value.push(data));
      }
    }
    this.setState({selectedLanguages: value});
    console.log(value);
  }

  sendForm(e) {
    e.preventDefault();
    const data = {
      projectName: document.getElementById('projectName').value,
      description: document.getElementById('description').value,
      languages: this.state.selectedLanguages
    };
    CreateProjectAction(atob(localStorage.getItem('USER_ID')),data)
      .then(() => {
        console.log('successful !');
        this.setState({redirect: <Redirect to="/projects" />})
      }).catch(err => console.log('error: ', err));
  }

  render() {
    return (
      <div>
        <AppHeader fixed>
          <MainHeader />
        </AppHeader>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Create</h1>
                    <p className="text-muted">Create your project</p>

                    <form onSubmit={e => this.sendForm(e)}>
                      <InputGroup className="mb-3">
                        <Input type="text" id="projectName" placeholder="Project Name" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Input type="text" id="description" placeholder="Description" />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <Col md="3">
                          <Label htmlFor="languages">Languages</Label>
                        </Col>
                        <Col md="9">
                          <Input type="select" name="languages" id="languages" onChange={this.handleChangeLanguages} multiple>
                            {
                              this.state.languages.map(language =>
                                <option key={language.id} id={language.id} value={language.languageCode}>{language.languageLabel}</option>
                              )
                            }
                          </Input>
                        </Col>
                      </InputGroup>

                      <Button color="success" block>Create Project</Button>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          { this.state.redirect }
        </div>
      </div>
    );
  }
}

export default CreateProject;
