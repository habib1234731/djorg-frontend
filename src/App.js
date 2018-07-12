import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NoteForm from './components/noteForm';
import Notes from './components/notes';
import Login from './components/login';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import {Route, BrowserRouter as Router } from 'react-router-dom';

const routes = [
  {
    path: "/",
    exact: true,
    main: (props) => <Login {...props} />,
  },
  {
    path: "/notes",
    main: (props) => <Container><NoteForm {...props} /><Notes /></Container>,
  },
];

class App extends Component {
  render() {
    return (
      <Router>
        <Container fluid={true} className="App">
          <Row className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to my Notes App</h1>
          </Row>
            <p className="App-intro">
              Just a simple app to take notes
            </p>
          <Row>
            <Col sm={12}>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              ))}
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

Container.propTypes = {
  fluid: PropTypes.bool
};

export default App;
