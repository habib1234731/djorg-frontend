import React, { Component } from "react";
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '', password: ''
        };

        this.loginHandler = this.loginHandler.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    inputHandler = (event) => {
        event.preventDefault();
        let new_state = this.state;
        new_state[event.target.name] = event.target.value;
        this.setState({ new_state })
    }

    loginHandler = (event) => {
        event.preventDefault();
        console.log('Login');
        axios.post(`${process.env.API_URL}/api-token-auth/`, { 
            username: this.state.username,
            password: this.state.password
         })
            .then(response => {
                console.log(`response: ${response}`);
                localStorage.setItem('authToken', response.data.token);
                this.props.history.push('/notes');
            }).catch(error => {
                console.log(`error: ${error}`)
            })

        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <Container className="my-5">
                <Form
                    onSubmit={this.loginHandler}
                    onChange={this.inputHandler}
                >
                <FormGroup>
                        <Input
                            className="w-50"
                            type="text"
                            placeholder="Username"
                            value={this.state.username}
                            name="username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            className="w-50"
                            placeholder="password"
                            name="password"
                            type="password"
                            rows="10"
                            cols="50"
                            value={this.state.password}
                        />
                    </FormGroup>

                    <Button
                        className="w-25"
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
          </Button>
                </Form>
            </Container>
        )
    }
}