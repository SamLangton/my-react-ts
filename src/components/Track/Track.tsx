import * as React from 'react';
import { List } from '../List';
import { Jockey } from '../Utils/interface';
import { Horse } from '../Horse';
import './Track.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

interface Props {
  jockeys: Array<Jockey>;
  raceState: boolean;
}

interface State {
  winnerArray: string;
}

export class Track extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      winnerArray: ''
    };
    this.mycallBack = this.mycallBack.bind(this);
    this.emptyArray = this.emptyArray.bind(this);
  }

  mycallBack(datafromChild: string) {
    if (this.props.raceState && this.state.winnerArray === '') {
    this.setState(prevState => ({ winnerArray: datafromChild}));
    }
  }
  emptyArray() {
    this.setState({winnerArray: ''});
  }
  render() {
    if (! this.props.raceState) {
      if (this.state.winnerArray.length > 0) {
      {this.emptyArray(); }
      }
      return (
        <div>
          {/* GAME NOT STARTED */}
              <div />
              <div> <h3>Chosen Racers </h3></div>
              {this.props.jockeys.map((jockey: Jockey) => (
                <List login={jockey.login} />
              ))}
              <br/>
              <div className="start"> <h3>Press Start To Race </h3></div>
              <br/>
            </div>
      );
    } else {
      return (
        // GAME STARTED
          <div>
          <h1 className="title">Winner:</h1>
          <h1>{this.state.winnerArray}</h1> 
            <div className="jockeys">
          {this.props.jockeys.map((jockey: Jockey) => (
            <MuiThemeProvider>
            <Horse 
                avatar_url={jockey.avatar_url} 
                login={jockey.login}
                winner={this.mycallBack}
            />
            </MuiThemeProvider>
          ))}
        </div>
        </div>
            
          );
        }
    }
  }
