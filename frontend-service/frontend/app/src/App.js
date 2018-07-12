import React, { Component } from 'react';
import logo from './logo.svg';
import { ListGroup, ListGroupItem, Grid, Row, Col, Panel  } from 'react-bootstrap/lib';

import './App.css';

class App extends Component {

  state = {
    tasks : [{
      "name": "Wonderfull-Repo-Github",
      "url": "https://github.com/balaprasanna/docker_k8s_workshop.git",
      "type": "git",
      "id": "5b473627bc30d0000f30385e"
    }],

    selectedId : 0
  }
  componentWillMount() {

    this.setState(
        {
          tasks : [{
            "name": "Wonderfull-Repo-Github",
            "url": "https://github.com/balaprasanna/docker_k8s_workshop.git",
            "type": "git",
            "id": "5b473627bc30d0000f30385e"
          }],
      
          selectedId : 0
        }
    )

    const API_ENDPOINT = process.env.REACT_APP_API_HOST || "http://localhost:3000"

    fetch(`${API_ENDPOINT}` + "/api/tasks")
      .then((res) => res.json())
      .then((tasks) => {
        console.log(tasks)
        this.setState( { tasks: tasks } )
      }) 
      .catch((error) => {
        console.log("Error, ", error)
      })
  }

  renderListGroupItems = () => {
    console.log(this.state)

  }

  itemClick = (index) => {
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Your Task List
          </h1>
        </header>

        <p>  </p>
        
        <Grid>
          <Row className="show-grid">
            <Col md={4} >
              
              <ListGroup>
              { 
                this.state.tasks.map((task, index) => {
                  return <ListGroupItem href="#" key= {index}  onClick={() => { this.setState( { selectedId: index }) } }  > { task.name } </ListGroupItem>;
                })
              }
              </ListGroup> 

            </Col>

            <Col md={8} >
              {this.state.tasks.length > 0 && 
              
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass="h3"> { this.state.tasks[this.state.selectedId].name } </Panel.Title>
                </Panel.Heading>
                <Panel.Body> { this.state.tasks[this.state.selectedId].url } </Panel.Body>
              </Panel>
              
            }

            {this.state.tasks.length == 0 && 
              
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass="h3"> No data </Panel.Title>
                </Panel.Heading>
                <Panel.Body> Please add some data using API </Panel.Body>
              </Panel>
              
            }

            </Col>
          </Row>
        </Grid>
        
         
      </div>
    );
  }
}

export default App;
