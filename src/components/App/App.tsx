import * as React from 'react';
import './App.css';
import { Track } from '../Track';
import { Form } from '../Form';
import { Jockey } from '../Utils/interface';

interface Props {}

interface State {
  horses: Array<Jockey>;
  startRace: boolean;
}

export class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      horses: [],
      startRace: false
    };
    this.addNewHorse = this.addNewHorse.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    // this.handleResetwithhorses = this.handleResetwithhorses.bind(this);
 }
  addNewHorse(newhorses: Jockey) {
    this.setState(prevState => ({ horses: prevState.horses.concat(newhorses)}));
  }
  handleClick() {
      if (this.state.horses.length < 2) {
          alert('Please select two or more racers');
      } else {
          this.setState({startRace: true});
      }
  }
  handleReset() {
    this.setState({startRace: false});
    this.setState({horses: []});
  }
//   handleResetwithhorses() {
//     this.setState({startRace: false});
//   }

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
        <div>
          <Form onSubmit={this.addNewHorse} />
          <Track jockeys={this.state.horses} raceState={this.state.startRace}/>
        </div>
        <div className="buttons">
          <button className="go" onClick={this.handleClick}>Start</button>
          <button className="reset" onClick={this.handleReset}>Reset</button>
          {/* <button className="resetsamehorse" onClick={this.handleResetwithhorses}>
        Reset with the same Racers</button> */}
        </div>
      </div>
    );
  }
}
