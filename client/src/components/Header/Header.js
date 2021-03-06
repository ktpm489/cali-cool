import React, { Component } from "react";
import API from "../../utils/API";
import { Navbar, Nav, NavItem, Modal, Form, FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Search from "../Search"

class Header extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
    open: false,
    userName:"",
    passWord:"",
    isLoggedIn: false,
    displayUser:"",
    userId:"",
    authenticationError: ""
    }
  };

  showModal = event => {
    this.setState({open: true})}

  closeModal = event => {
    this.resetModalState();
    window.location.reload()
  }

  resetModalState = event => {
    this.setState({ 
      open: false,
      authenticationError: "" })
  }
 
  saveAndClose = event => {
    this.setState({ open: false })};

  logoutUser = event => {
    API.logout()
    .then(res => {
      this.setState({
        isLoggedIn:false
      })
    })
    .then(res => {
      sessionStorage.clear();

      // Redirect to root page if the current page is publish
      if(window.location.pathname === "/publish"){
        window.location.href = "/";
      }
      else{
        window.location.reload()
      }
    })
    .catch(err =>{console.log(err)
    })
  };

  componentDidMount() {
    this.getSessionData()
  }


  getSessionData = event => {
    API.sessionData()
    .then(res => {
      const isLoggedIn =res.data.loggedIn;
      const loggedInUser = res.data.userName
      const mongoId = res.data.userId
      
      if (isLoggedIn === true) {
        this.setState({
          isLoggedIn: true,
          displayUser: loggedInUser,
          userId: mongoId
        });
        sessionStorage.setItem("userId", this.state.userId);
      }
      else {
        sessionStorage.clear();
      }
    })
    .catch(err => console.log(err))
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value
    });
  }

   handleFormSubmit = event => {
    event.preventDefault();
    API.loginUser({
      username:this.state.userName,
      password:this.state.passWord
    })
    .then(res => {

       this.closeModal();

      // Redirect to user page if the current page is signup
      if(window.location.pathname === "/signup"){
        window.location.href = res.data.successRedirect;
      }
    })
    .catch(err => {
      this.setState({
        authenticationError: err.response.data.errMessage
      })
    });
  };

  render(){

    return (
      <div>

        <Navbar inverse collapseOnSelect>

          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Cali.cool</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            {this.state.isLoggedIn !== true ? (
              <Nav pullRight>
                <Navbar.Text style={{marginTop: '8px', marginLeft: '15px', marginBottom: '0px'}}>
                  {/*<span style={{color: '#fff'}} className="glyphicon glyphicon-search"></span>*/}
                  <Search/>
                </Navbar.Text>
                <Navbar.Text style={{marginLeft: '15px'}}>
                  Welcome
                </Navbar.Text>
                <LinkContainer to="/signup">
                  <NavItem eventKey={1}>Signup</NavItem>
                </LinkContainer>
                <NavItem 
                  onClick={this.showModal}>
                  Login
                </NavItem>
              </Nav>
                  ) : (
              <Nav pullRight>
                <Navbar.Text style={{marginTop: '8px', marginLeft: '15px', marginBottom: '0px'}}>
                  {/*<span style={{color: '#fff'}} className="glyphicon glyphicon-search"></span>*/}
                  <Search/>
                </Navbar.Text>
                <LinkContainer to={'/user/' + this.state.userId}>
                  <NavItem 
                  eventKey={1}
                  onClick={this.getSessionData}
                  >
                    <span style={{marginRight: '5px'}} className="glyphicon glyphicon-user"></span>
                    {this.state.displayUser}
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/publish">
                  <NavItem 
                  eventKey={2}
                  onClick={this.getSessionData}
                  >Publish</NavItem>
                </LinkContainer>
                <NavItem 
                  eventKey={3}
                  onClick={this.logoutUser}
                  >Logout
                  </NavItem>
                </Nav>
              )}

          </Navbar.Collapse>

        </Navbar>
        
      <Modal
        show={this.state.open}
        onHide={this.resetModalState}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id='ModalHeader'>Login into your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form 
          horizontal
          onSubmit={this.handleFormSubmit}>


          { this.state.authenticationError &&
            <FormGroup>
              <Col sm={12}>
                <div className="alert alert-danger" role="alert">
                  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> &nbsp;
                  <span className="sr-only">Error:</span>
                   {this.state.authenticationError}
                </div>
              </Col>
            </FormGroup>
          }


            <FormGroup controlId="formHorizontalUserName"
            >
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl 
                type="text" 
                placeholder="Username"
                name="userName"
                onChange={this.handleInputChange}
                value={this.state.userName}
                 />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl 
                type="password" 
                placeholder="Password"
                name="passWord"
                onChange={this.handleInputChange}
                value={this.state.passWord} />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">
                  Login
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
  </div>
      );
  }
}

export default Header;
