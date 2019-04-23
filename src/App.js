import React, {Component} from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [{
  id : 1,
  img : 'https://placeimg.com/64/64/1',
  name : '조현재',
  birthday : '940308',
  gender : '남',
  job : '학생'
},{
  id : 2,
  img : 'https://placeimg.com/64/64/2',
  name : '조현재',
  birthday : '940308',
  gender : '남',
  job : '학생'
},{
  id : 3,
  img : 'https://placeimg.com/64/64/3',
  name : '조현재',
  birthday : '940308',
  gender : '남',
  job : '학생'
}]

class App extends Component {
  render(){
    return (
      <div>
        {
          customers.map(c => {
            return <Customer
              key={c.id}
              id={c.id}
              img={c.img}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          })
        }
      </div>
    );
  }
}

export default App;
