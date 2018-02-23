/// <reference path='../../Form.d.ts' />
import * as React from 'react';
import './Horse.css';
import Progress from 'react-progressbar';
import Avatar from 'material-ui/Avatar';

interface Props {
  avatar_url: string;
  login: string;
  winner: (i: string) => void;
}

interface State {
  speed: number;
  progress: number;
}

export class Horse extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      speed: Math.floor(Math.random() * 100) + 50,
      progress: 0,
    };
    this.interval = this.interval.bind(this);
  }
  interval() {
    if (this.state.progress > 99) {
      this.setState({ progress: 100 });
      this.props.winner(this.props.login);
    } else {
      this.setState(prevState => ({ progress: prevState.progress + 0.4 }));
    }
    
  }
  componentDidMount() {
    setInterval(this.interval, this.state.speed);
  }
  render() {
    return (
      <div className="jockey">
        <Avatar src={this.props.avatar_url} alt="avatar" size="30"/>
        {this.props.login}
        <div className="progress">
        <Progress completed={this.state.progress} />
        </div>
      </div>
    );
  }
}
