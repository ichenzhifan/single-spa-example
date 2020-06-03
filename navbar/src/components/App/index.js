import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/selector/mapState';
import { mapDispatchToProps } from '../../redux/selector/mapDispatch';
import Route from '../Route';

import './index.scss';

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class App extends Component {
  constructor(props) {
    super(props);

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

  render() {
    const { todos } = this.props;

    return (
      <Fragment>
        <Route/>
        
        <h1>this is router</h1>      
      </Fragment>
    );
  }
}

export default App;
