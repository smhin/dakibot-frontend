import React, { Component } from 'react';
import {
  Badge, Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, Input,
  InputGroup,
  Modal, ModalBody, ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import {Link} from "react-router-dom";
import {AddIntentToContextAction} from "../../actions/IntentsAction";
import {CreateLanguageAction} from "../../actions/LanguageAction";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class MainHeader extends Component {

  constructor() {
    super();
    this.state = {
      createLanguageModal: false
    }
    this.logOut = this.logOut.bind(this);
    this.toggleCreateLanguageModal = this.toggleCreateLanguageModal.bind(this);
  }

  logOut() {
    localStorage.clear();
  }

  toggleCreateLanguageModal() {
    this.setState({
      createLanguageModal: !this.state.createLanguageModal,
    });
  }

  sendForm(e) {
    e.preventDefault();
    const data = {
      languageCode: document.getElementById('languageCode').value,
      languageLabel: document.getElementById('languageLabel').value
    };

    CreateLanguageAction(data)
      .then((response) => {
        console.log(response);
        this.toggleCreateLanguageModal();
        window.location.reload();
      }).catch(err => {
      console.log(err);
    });
  }

  render() {

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'DakiBot Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'DakiBot Logo' }}
        />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="#/projects">Projects</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <Link to="/login" onClick={this.logOut}><i className="fa fa-sign-out"></i> Logout</Link>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Settings<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Projects</strong></DropdownItem>
              <DropdownItem onClick={this.toggleCreateLanguageModal}><i className="fa fa-usd"></i> Languages<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/#login" onClick={this.logOut}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <Modal isOpen={this.state.createLanguageModal} toggle={this.toggleCreateLanguageModal}
               className={'modal-primary ' + this.props.className}>
          <ModalHeader toggle={this.toggleCreateLanguageModal}>New Language</ModalHeader>
          <ModalBody>
            <form onSubmit={e => this.sendForm(e)}>
              <InputGroup className="mb-3">
                <Input type="text" id="languageCode" placeholder="Code" />
              </InputGroup>
              <InputGroup className="mb-3">
                <Input type="text" id="languageLabel" placeholder="Label" />
              </InputGroup>
              <Button color="primary" block>Create Language</Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleCreateLanguageModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

MainHeader.propTypes = propTypes;
MainHeader.defaultProps = defaultProps;

export default MainHeader;
