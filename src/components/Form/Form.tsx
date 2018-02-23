/// <reference path='../../Form.d.ts' />
import * as React from 'react';
const data: Array<Jockey> = require('../../team.json');
import { Jockey } from '../Utils/interface';

interface Props {
  onSubmit: (i: Jockey) => void;
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
    var list: string[] = [];
    for (var i of data) {
      if (i.login === this.state.userName && !list.includes(i.login)) {
        this.props.onSubmit(i);
        list.push(i.login);
      }
    }
    this.setState({ userName: '' });
  }
  handleRandomSubmit() {
    var list: string[] = [];
    for (var k = 0; k < parseInt(this.state.randomNum, 10); k++) {   
        var rand = Math.floor(Math.random() * data.length);
        var i: Jockey = data[rand];
        for (var j = 0; j <= list.length; j++) {
            if (list.length > 0 && i.login === list[j - 1]) {
                k--;
            } else {
                this.props.onSubmit(i);
                list.push(i.login);
                break;
                
            }
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
      <div>
          <br/>
          <div>
          <select
            onChange={event => this.setState({userName: event.target.value})}
            multiple={true}
          >
            {...this.createSelectedItems()}
          </select>
          <br/>
          <button type="submit" onClick={this.handleSubmit}> Add Player </button>
          </div>
          <br/>
          <div>
          <input 
            type="text" 
            value={this.state.randomNum} 
            onChange={(event) => this.setState({randomNum: event.target.value})}
            placeholder="Number of random Racers"
          />
          <br/>
          <button type="submit" onClick={this.handleRandomSubmit}> Add Players </button>
          </div>
      </div>
    );
  }
}
