import React, { Component } from 'react';
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Table,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, Input
} from 'reactstrap';
import {AddIntentToContextAction, GetIntentsAction} from "../../actions/IntentsAction";
import {GetContextsAction} from "../../actions/ProjectAction";
import {Redirect} from "react-router-dom";


class Intents extends Component {

  constructor() {
    super();
    this.state = {
      intents: [],
      contexts: [],
      createIntentModal: false
    };
    this.toggleCreateIntentModal = this.toggleCreateIntentModal.bind(this);
  }

  componentWillMount() {
    GetIntentsAction(this.props.match.params.projectId, atob(localStorage.getItem('USER_ID')))
      .then((data) => this.setState({intents: data}))
      .catch(<Redirect to="/404" />);

    GetContextsAction(this.props.match.params.projectId)
      .then(response => this.setState({contexts: response}))
      .catch(<Redirect to="/404" />);
  }

  toggleCreateIntentModal() {
    this.setState({
      createIntentModal: !this.state.createIntentModal,
    });
  }

  sendForm(e) {
    e.preventDefault();
    const data = {
      intentLabel: document.getElementById('intentLabel').value,
      intentDescription: document.getElementById('intentDescription').value
    };
    let contexts = document.getElementById('contexts');
    const contextId = contexts.options[contexts.selectedIndex].value;

    AddIntentToContextAction(this.props.match.params.projectId, contextId, atob(localStorage.getItem('USER_ID')), data)
      .then((response) => {
        console.log(response);
        this.toggleCreateIntentModal();
        window.location.reload();
      }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="cui-layers"></i><strong>Intents</strong>
                <div className="card-header-actions">
                  <Button color="link" className="card-header-action" onClick={this.toggleCreateIntentModal}>
                    <small>Create</small>
                  </Button>
                  <Modal isOpen={this.state.createIntentModal} toggle={this.toggleCreateIntentModal}
                         className={'modal-primary ' + this.props.className}>
                    <ModalHeader toggle={this.toggleCreateIntentModal}>New Intent</ModalHeader>
                    <ModalBody>
                      <form onSubmit={e => this.sendForm(e)}>
                        <InputGroup className="mb-3">
                          <Input type="text" id="intentLabel" placeholder="Label" />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <Input type="text" id="intentDescription" placeholder="Description" />
                        </InputGroup>
                        <InputGroup className="mb-3">
                          <Input type="select" name="contexts" id="contexts" placeholder="Contexts" onChange={this.handleChangeLanguages}>
                            <option value="0">Choose a context</option>
                            {
                              this.state.contexts.map(context =>
                                <option id={context.id} key={context.id} value={context.id}>{context.contextLabel}</option>
                              )
                            }
                          </Input>
                        </InputGroup>

                        <Button color="primary" block>Create Intent</Button>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggleCreateIntentModal}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Label</th>
                    <th>Description</th>
                    <th>Context</th>
                    <th>Expressions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.intents.map(intent =>
                      <tr key={intent.id}>
                        <td>{intent.intentLabel}</td>
                        <td>{intent.intentDescription}</td>
                        <td>{intent.intentLabel}</td>
                        <td>
                          <Badge color="success">{intent.expressions.length}</Badge>
                        </td>
                      </tr>
                    )
                  }
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Intents;
