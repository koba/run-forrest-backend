import React, { Component } from 'react';
import { Marker, Polyline } from 'react-google-maps';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Map } from './Map';

import RunForrest from '../services/RunForrest';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      runs: [],
      runState: {}
    };

    RunForrest.getRuns().then(res => {
      this.setState({ runs: res.data });
      RunForrest.getRunState(res.data[0].id).then(res => {
        this.setState({ runState: res.data });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">run-forrest</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Runs
                </DropdownToggle>
                <DropdownMenu right>
                  {
                    this.state.runs.map(run => (
                      <DropdownItem key={run.id}>{run.name}</DropdownItem>
                    ))
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <Map
          containerElement={<div style={{ height: `400px` }} />}
          loadingElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places">
          {
            Object.keys(this.state.runState).length && Object.keys(this.state.runState.runners).map(k => {
              let last = this.state.runState.runners[k].coordinates.length - 1;
              return (
                <Marker
                  key={k}
                  position={{ lat: this.state.runState.runners[k].coordinates[last][1], lng: this.state.runState.runners[k].coordinates[last][0] }}  
                />
              )
            })
          }
        </Map>
      </div>
    );
  }
}

export default App;
