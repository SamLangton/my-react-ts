/// <reference path='../../Form.d.ts' />
import * as React from 'react';
import './Horse.css';
import Progress from 'react-progressbar';

interface Props {
  avatar_url: string;
  login: string;
  place: number;
  changePlace: (place: number) => void;
}

interface State {
  speed: number;
  progress: number;
  count: number;
}

export class Horse extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      speed: Math.floor(Math.random() * 100) + 50,
      progress: 0,
      count: 0
    };
    this.interval = this.interval.bind(this);
  }
  interval() {
    if (this.state.progress > 99) {
      this.setState({ progress: 100 });
    } else {
      this.setState(prevState => ({ progress: prevState.progress + 0.4 }));
    }
    if (this.state.progress > 99 && this.state.count < 1) {
        this.setState({count: 1});
        for ( let j = 0; j < 1; j++) {
        alert(this.props.login + ' is the winner!');
        break;
        }
    }
    
  }
  componentDidMount() {
    setInterval(this.interval, this.state.speed);
  }
  render() {
    return (
      <div className="jockey">
        <img src={this.props.avatar_url} alt="avatar" />
        {this.props.login}
        <div className="progress">
        <Progress completed={this.state.progress} />
        </div>
      </div>
    );
  }
}
