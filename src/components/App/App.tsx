/// <reference path='../../Form.d.ts' />
import * as React from 'react';
import './App.css';
import { Track } from '../Track';
import { Form } from '../Form';
import { Jockey } from '../Utils/interface';
// import { Button } from '../Button'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

interface Props {}

interface State {
  horses: Array<Jockey>;
  startRace: boolean;
  racers: Array<string>;
  reset: boolean;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      horses: [],
      startRace: false,
      racers: [],
      reset: false,
    };
    this.addNewHorse = this.addNewHorse.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleResetWith = this.handleResetWith.bind(this);
 }
  addNewHorse(newhorses: Jockey) {
    this.setState(prevState => ({ horses: prevState.horses.concat(newhorses)}));
    this.setState(prevState => ({racers: prevState.racers.concat(newhorses.login)}));
  }
  handleClick() {
      if (this.state.horses.length < 2) {
          alert('Please select two or more racers');
      } else {
          this.setState({startRace: true});
          this.setState({reset: false});
      }
  }
  handleReset() {
    this.setState({startRace: false});
    this.setState({horses: []});
    this.setState({racers: []});
  }
  
  handleResetWith() {
    this.setState({startRace: false});
    this.setState({racers: []});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={require('../../images/logo.svg')}
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title"> Welcome to React with Typescript </h1>
          <h2 className="App-sub-title"> Kurtosys Grads </h2>
        </header>

        {/* FORM */}

          <MuiThemeProvider>
          <Form onSubmit={this.addNewHorse} addedplayer={this.state.racers} />
          </MuiThemeProvider>

          {/* TRACK */}

          <MuiThemeProvider>
          <Track jockeys={this.state.horses} raceState={this.state.startRace}/>
          </MuiThemeProvider>

        {/* BUTTONS */}
          {/* Start */}
        <div className="buttons">
        <MuiThemeProvider>
          <RaisedButton 
            className="go" 
            onClick={this.handleClick} 
            label="Start"
            backgroundColor="green"
          />
            {/* ResetWithSamePlayers */}
          <RaisedButton 
            className="go" 
            onClick={this.handleResetWith} 
            label="Reset with same Racers"
            backgroundColor="Orange"
          />
           {/* Reset */}
          <RaisedButton 
            className="reset" 
            onClick={this.handleReset} 
            label="Restart"
            backgroundColor="red"
          />
        </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
