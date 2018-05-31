import React, { Component } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import ProjectItem from './ProjectItem';
import { GetUserAction } from "../../actions/UserAction";

import { AppHeader } from '@coreui/react';
import MainHeader from '../../containers/DefaultLayout/MainHeader';


class Projects extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      projects: []
    };
  }

  componentWillMount() {
    GetUserAction(atob(localStorage.getItem('USER_ID')))
      .then((data) => {
        this.setState({user: data, projects: data.projects});
      })
  }

  render() {
    return (
      <div>
        <AppHeader fixed>
          <MainHeader />
        </AppHeader>
        <div className="app flex-row align-items-center">
          <Container>
            <div className="justify-content-center">
              <div className="animated fadeIn">
                <br/><br/>
                <Row>
                  <Col col="10">
                    <h3>Hello {this.state.user.username}</h3>
                  </Col>
                  <Col col="2" sm="2" md="2">
                    <Button href="#/createProject" block color="primary">Create</Button>
                  </Col>
                </Row>
                <br/>
                <Row>
                  {
                    this.state.projects.map(project =>
                      <Col key={project.id} xs="6" sm="6" lg="6">
                        <ProjectItem header={project.projectName}
                                     mainText={project.description}
                                     icon="fa fa-cogs"
                                     color="primary" footer link={"/project/" + project.id} />
                      </Col>)
                  }
                </Row>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Projects;
