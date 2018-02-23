/// <reference path='../../Form.d.ts' />
import * as React from 'react';
const data: Array<Jockey> = require('../../team.json');
import { Jockey } from '../Utils/interface';
import RaisedButton from 'material-ui/RaisedButton';
import './Form.css';

interface Props {
  onSubmit: (i: Jockey) => void;
  addedplayer: Array<string>;
}

interface State {
  userName: string;
  randomNum: string;
}

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userName: '',
      randomNum: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRandomSubmit = this.handleRandomSubmit.bind(this);
    this.createSelectedItems = this.createSelectedItems.bind(this);
}

  handleSubmit() {
    for (var i of data) {
      if (i.login === this.state.userName &&  !this.props.addedplayer.includes(i.login)) {
        this.props.onSubmit(i);
      }
    }
    this.setState({ userName: '' });
  }
  handleRandomSubmit() {
    var list: string[] = [];
    for (var k = 0; k < parseInt(this.state.randomNum, 10); k++) {   
        var rand = Math.floor(Math.random() * (data.length));
        var i: Jockey = data[rand];
        if (this.props.addedplayer.length + list.length === data.length) {
          alert('There are no more players');
          break;
        } else if (list.includes(i.login) || this.props.addedplayer.includes(i.login)) {
            k--;
        } else {
            this.props.onSubmit(i);
            list.push(i.login);
        }
    }
    this.setState({ randomNum: ''}); 
}
createSelectedItems() {
  let items = [];
  for (let i = 0; i < data.length;  i++) {
      items.push(<option key={i} value={data[i].login}>{data[i].login}</option>);
  }
  return items;
}
  render() {
    return (
      <div className="form">

      {/* SELECT A JOCKEY */}
          <div className="indiv">
          <br/>
          <select
            onChange={event => this.setState({userName: event.target.value})}
            multiple={true}
          >
            {...this.createSelectedItems()}
          </select>
          <br/>
          <br/>
          <RaisedButton type="submit" onClick={this.handleSubmit} label="Add Player" />
          </div>
        <br/>

        {/* RANDOM SELECTED JOCKEY */}
          <div className="random">
          <input 
            type="text" 
            value={this.state.randomNum} 
            onChange={(event) => this.setState({randomNum: event.target.value})}
            placeholder="Number of random Racers"
          />
          <br/>
          <br/>
          <RaisedButton type="submit" onClick={this.handleRandomSubmit} label="Add Players"/>
          </div>
      </div>
    );
  }
}
