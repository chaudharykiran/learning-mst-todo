import React from 'react';
import ReactDOM from 'react-dom';
import { types } from 'mobx-state-tree';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Todo = types.model({
  name: '',
  done: false,
});

const User = types.model({
  name: '',
});

const john = User.create();
const eat = Todo.create({ name: 'eat', done: 1 });

console.log('John:', john.toJSON());
console.log('Eat TODO:', eat.toJSON());

ReactDOM.render(<div>
    John: {JSON.stringify(john)}
  <br />
    Eat TODO: {JSON.stringify(eat)}
                </div>, document.getElementById('root'));
registerServiceWorker();
