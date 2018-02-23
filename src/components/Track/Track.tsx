import * as React from 'react';
import { List } from '../List';
import { Jockey } from '../Utils/interface';
import { Horse } from '../Horse';

interface Props {
  jockeys: Array<Jockey>;
  raceState: boolean;
}

interface State {
    place: number;
}

export class Track extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
        place: 1
    };
  }

place( datafromChild: number ) {
    this.setState({place: datafromChild + 1});
}
  render() {
    if (! this.props.raceState) {
      return (
        <div>
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
            <div className="jockeys">
          {this.props.jockeys.map((jockey: Jockey) => (
            <Horse 
                avatar_url={jockey.avatar_url} 
                login={jockey.login}
                place={this.state.place}
                changePlace={this.place}
            />
          ))}
        </div>
            
          );
        }
    }
  }
