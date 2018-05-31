import React, { Component } from 'react';
import {CardGroup, Badge, Button, Modal, ModalHeader, ModalBody, InputGroup, Input, ModalFooter} from 'reactstrap';
import Widget04 from './Widget04';
import {AddContextToProjectAction, GetProjectAction} from "../../actions/ProjectAction";

class Project extends Component {
  constructor() {
    super();
    this.state = {
      project: {},
      languages: [],
      contexts: [],
      createContextModal: false
    };
    this.toggleCreateContextModal = this.toggleCreateContextModal.bind(this);
  }

  componentWillMount() {
    localStorage.setItem('PROJECT_ID', this.props.match.params.projectId);
    GetProjectAction(this.props.match.params.projectId, atob(localStorage.getItem('USER_ID')))
      .then((data) => {
        this.setState({project: data, languages: data.languages, contexts: data.contexts});
      });
  }

  toggleCreateContextModal() {
    this.setState({
      createContextModal: !this.state.createContextModal,
    });
  }

  sendForm(e) {
    e.preventDefault();
    const data = {
      contextLabel: document.getElementById('contextLabel').value
    };
    AddContextToProjectAction(this.props.match.params.projectId, atob(localStorage.getItem('USER_ID')) ,data)
      .then((response) => {
        console.log(response);
        window.location.reload();
      }).catch(err => {
      console.log(err);
    });
  }

  render() {

    return (
      <div className="animated fadeIn">
        <CardGroup className="mb-4">
          <Widget04 icon="icon-people" color="info" header="87.500" value="25">Bot Users</Widget04>
          <Widget04 icon="icon-user-follow" color="success" header="385" value="25">New users</Widget04>
          <Widget04 icon="cui-speech" color="warning" header="1238" value="25">Queries</Widget04>
          <Widget04 icon="cui-layers" color="primary" header="28" value="25">Intents</Widget04>
        </CardGroup>
        <div className="card">
          <div className="card-header">
            <b>Project Details</b>
            <div className="card-header-actions">
              <Button color="link" className="card-header-action" onClick={this.toggleCreateContextModal}>
                <small>Create Context</small>
              </Button>
              <Modal isOpen={this.state.createContextModal} toggle={this.toggleCreateContextModal}
                     className={'modal-primary ' + this.props.className}>
                <ModalHeader toggle={this.toggleCreateContextModal}>New Context</ModalHeader>
                <ModalBody>
                  <form onSubmit={e => this.sendForm(e)}>
                    <InputGroup className="mb-3">
                      <Input type="text" id="contextLabel" placeholder="Label" />
                    </InputGroup>
                    <Button color="primary" block>Create Context</Button>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleCreateContextModal}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
          <div className="card-body">
            <div className="bd-example">
              <dl className="row">
                <dt className="col-sm-3">ID</dt>
                <dd className="col-sm-9">{this.state.project.id}</dd>

                <dt className="col-sm-3">Name</dt>
                <dd className="col-sm-9">
                  <p>{this.state.project.projectName}</p>
                </dd>

                <dt className="col-sm-3">Description</dt>
                <dd className="col-sm-9">{this.state.project.description}</dd>

                <dt className="col-sm-3 text-truncate">Languages</dt>
                <dd className="col-sm-9">
                  {
                    this.state.languages.map(language => <Badge key={language.id} color="secondary">{language.languageCode}</Badge>  )
                  }
                </dd>

              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
