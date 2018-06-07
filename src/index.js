import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { types, onSnapshot, applySnapshot } from 'mobx-state-tree';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const randomId = () => Math.floor(Math.random() * 1000).toString(36);

const Todo = types.model({
  name: types.optional(types.string, ''),
  done: types.optional(types.boolean, false),
}).actions((self) => {
  function setName(newName) {
    self.name = newName;
  }

  function toogle() {
    self.done = !self.done;
  }

  return { setName, toogle };
});

const User = types.model({
  name: types.optional(types.string, ''),
});

const RootStore = types.model({
  users: types.map(User),
  todos: types.optional(types.map(Todo), {}),
}).views(self => ({
  get pendingCount() {
    return self.todos.values().filter(todo => !todo.done).length;
  },

  get completedCount() {
    return self.todos.values().filter(todo => todo.done).length;
  },
})).actions((self) => {
  function addTodo(id, name) {
    self.todos.set(id, Todo.create({ name }));
  }

  return { addTodo };
});

const store = RootStore.create({
  users: { },
  todos: {
    1: {
      name: 'Eat a cake',
      done: true,
    },
  },
});

applySnapshot(store, {
  users: {},
  todos: {
    1: {
      name: 'Eat a cake',
      done: true,
    },
  },
});

window.store = store;

onSnapshot(store, snapshot => console.log(snapshot));

const App = observer(props => (
  <div>
    <input type="checkbox" checked={props.todo.done} onChange={e => props.todo.toogle()} />
    <input type="text" value={props.todo.name} onChange={e => props.todo.setName(e.target.value)} />
  </div>
));

const TodoView = observer(props =>
  (<div>
    <input type="checkbox" checked={props.todo.done} onChange={e => props.todo.toogle()} />
    <input type="text" value={props.todo.name} onChange={e => props.todo.setName(e.target.value)} />
   </div>));


const AppView = observer(props =>
  (<div>
    <button onClick={e => props.store.addTodo(randomId(), 'New Task')}>Add Task</button>
    {/* {props.store.todos.values().map(todo => <TodoView todo={todo} />)} */}
  </div>));


ReactDOM.render(<AppView store={store} />, document.getElementById('root'));
registerServiceWorker();
