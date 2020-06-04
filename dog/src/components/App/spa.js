import React, { Component, Fragment, createRef } from 'react';
import {get} from 'lodash';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/selector/mapState';
import { mapDispatchToProps } from '../../redux/selector/mapDispatch';
import Route from '../Route';

import { Provider } from 'react-redux';

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: get(props, '$global.stores.navbar')
    }
    this.ref = createRef();
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onAdd() {
    const { boundActions } = this.props;
    const title = this.ref.current.value;

    if (title) {
      boundActions.add({ title });
      this.ref.current.value = '';
    }
  }

  onRemove(id) {
    const { boundActions } = this.props;
    boundActions.remove(id);
  }

  getNavbarClock = () => {
    const { store } = this.state;
    return store.getState().clock;
  };

  incream = () => {
    const { $global } = this.props;
    $global.dispatch({ type: 'INCREAM'});
  };

  decream = () => {
    const { $global } = this.props;
    $global.dispatch({ type: 'DECREAM'});
  };

  render() {
    const { todos } = this.props;

    return (
      <Fragment>
        <Route/>
        
        <div>
          <h1>{this.getNavbarClock()}</h1>
          <button onClick={this.incream}>incream</button>
          <button onClick={this.decream}>decream</button>
        </div>

        <div>
          <input type="text" ref={this.ref} />
          <button onClick={this.onAdd}>add</button>
        </div>
        <ul>
          {todos.map(m => {
            return (
              <li key={m.get('id')}>
                <span>{m.get('title')}</span>
                <button onClick={this.onRemove.bind(this, m.get('id'))}>
                  remove
                </button>
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default props => {
  return <Provider store={props.store}>
    <App {...props}/>
  </Provider>
};
