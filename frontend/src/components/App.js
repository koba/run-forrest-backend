import polyline from '@mapbox/polyline';
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
      routePolyline: null,
      runs: [],
      runState: {},
      simulationRunners: []
    };

    RunForrest.getRuns().then(res => {
      this.setState({ runs: res.data });
      RunForrest.getRunState(res.data[0].id).then(res => {
        this.setState({ runState: res.data });
      });
    });
  }

  componentWillMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 83) {
        this.startSimulation();
      }
    })
  }

  startSimulation() {
    let run = this.state.runs[0];
    let runGeometry = polyline.decode(run.path);
    let that = this;

    this.setState({
      simulationRunners: [
        { id: '1', latitude: runGeometry[0][0], longitude: runGeometry[0][1] },
        { id: '2', latitude: runGeometry[0][0], longitude: runGeometry[0][1] }
      ]
    })

    let distance1 = 0;
    let distance2 = 0;

    setInterval(function () {
      distance1 += 10;
      distance2 += 12;
      let posRunner1 = that.pointAtDistance(runGeometry, distance1);
      let posRunner2 = that.pointAtDistance(runGeometry, distance2);
      let simulationRunners = that.state.simulationRunners;
      simulationRunners[0] = { ...simulationRunners[0], latitude: posRunner1[0], longitude: posRunner1[1] }
      simulationRunners[1] = { ...simulationRunners[1], latitude: posRunner2[0], longitude: posRunner2[1] }
      that.setState({ simulationRunners: simulationRunners });
    }, 1000);
  }

  pointAtDistance(geometry, metres) {
    // some awkward special cases
    if (metres == 0) return geometry[0];
    if (metres < 0) return null;
    if (geometry.length < 2) return null;
    var dist=0;
    var olddist=0;
    for (var i=1; (i < geometry.length && dist < metres); i++) {
      olddist = dist;
      dist += this.distanceFrom(geometry[i - 1], geometry[i]);
    }
    if (dist < metres) {
      return null;
    }
    var p1= geometry[i-2];
    var p2= geometry[i-1];
    var m = (metres-olddist)/(dist-olddist);
    return [p1[0] + (p2[0]-p1[0])*m, p1[1] + (p2[1]-p1[1])*m];
  }

  distanceFrom(from, to) {
    var EarthRadiusMeters = 6378137.0; // meters
    var lat1 = from[0];
    var lon1 = from[1];
    var lat2 = to[0];
    var lon2 = to[1];
    var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = EarthRadiusMeters * c;
    return d;
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex', flexDirection: 'column'}}>
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
        <div style={{ flex: 1 }}>
          <Map
            containerElement={<div style={{ height: `100%` }} />}
            loadingElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places">
              {/** run's path **/}
              {
                this.state.runs.length && (
                  <Polyline
                    ref={ref => !this.state.routePolyline ? this.setState({ routePolyline: ref }) : null}
                    key={'run'}
                    path={polyline.decode(this.state.runs[0].path).map(decodedPolyline => ({ lat: decodedPolyline[0], lng: decodedPolyline[1]}))}  
                    options={{
                      geodesic: true,
                      strokeColor: '#375b41',
                      strokeWeight: 2
                    }}
                  />
                )
              }
              {/** runner's markers **/}
              {
                false && Object.keys(this.state.runState).length && Object.keys(this.state.runState.runners).map(k => {
                  let last = this.state.runState.runners[k].coordinates.length - 1;
                  return (
                    <Marker
                      key={k}
                      position={{ lat: this.state.runState.runners[k].coordinates[last][1], lng: this.state.runState.runners[k].coordinates[last][0] }}  
                    />
                  )
                })
              }
              {/** runner's polylines **/}
              {
                false && Object.keys(this.state.runState).length && Object.keys(this.state.runState.runners).map(k => {
                  return (
                    <Polyline
                      key={k}
                      path={polyline.decode(this.state.runState.runners[k].route.geometry).map(decodedPolyline => ({ lat: decodedPolyline[0], lng: decodedPolyline[1]}))}  
                      options={{
                        geodesic: true,
                        strokeColor: '#ff0000',
                        strokeWeight: 2
                      }}
                    />
                  )
                })
              }
              {/** simulation **/}
              {
                this.state.simulationRunners.map(runner => {
                  return (
                    <Marker
                      key={runner.id}
                      position={{ lat: runner.latitude, lng: runner.longitude }}  
                    />
                  )
                })
              }
          </Map>
        </div>
      </div>
    );
  }
}

export default App;
