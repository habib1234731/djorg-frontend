import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';
import Cookies from 'js-cookie';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };
        this.addNote = this.addNote.bind(this);
    }

    addNote = (event) => {
        event.preventDefault();
        // let update = {
        //     title: this.state.title,
        //     content: this.state.content
        // }
        // let csrftoken = Cookies.get('csrftoken');
        // console.log(csrftoken);
        console.log("creating config");
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("authToken")}`
            }
        }
        console.log(config);
        axios.post("https://agentt732-djorg.herokuapp.com/api/notes/", { 
            title: this.state.title,
            content: this.state.content
         }, config)
            .then(response => {
                console.log(`response: ${response}`);
            }).catch(error => {
                console.log(`error: ${error}`)
            })

        this.setState({
            title: '',
            content: ''
        })
    }

    inputHandler = (event) => {
        event.preventDefault();
        let new_note = this.state;
        new_note[event.target.name] = event.target.value;
        this.setState({ new_note })
    }

    

    render() {
        return (
            <Container className="my-5">
                <Form
                    onSubmit={this.addNote}
                    onChange={this.inputHandler}
                > 
                {/* {% csrf_token %} */}
                    <FormGroup>
                        <Input
                            className="w-50"
                            type="text"
                            placeholder="Title"
                            value={this.state.title}
                            name="title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <textarea
                            className="form-control"
                            placeholder="Note"
                            name="content"
                            rows="10"
                            cols="50"
                            value={this.state.content}
                        />
                    </FormGroup>
                    <Button className="w-25" type="submit">Save</Button>
                </Form>
            </Container>
        )
    }
}

export default NoteForm;