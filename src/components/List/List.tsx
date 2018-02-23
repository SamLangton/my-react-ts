import * as React from 'react';
import './List.css';

interface Props {
  login: string;
}

interface State {}

export class List extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return <div className="listOfJockeys">{this.props.login}</div>;
  }
}
