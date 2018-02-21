import React from 'react';
import styled from 'styled-components';


import { DefaultButton, IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { connect } from 'react-redux';


const Block = styled.div`
  width:1vw;
  height:1vw;
`;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: props.isDrawing,
      mode: props.mode,
    };
  }
  serialize(){
    this.props.serialize();
  }

  switchMode(mode, toggle) {
    if (toggle) {
      this.setState({ mode: mode });
      this.props.dispatch_mode(mode);
    }
  }

  render() {
    return (
      <div className="menu">
        <Item name={'Brush'} checked={this.state.mode === 'Brush'} emitAction={this.switchMode.bind(this)}></Item>
        <Item name={'Eraser'} checked={this.state.mode === 'Eraser'} emitAction={this.switchMode.bind(this)}></Item>
        <Item name={'Export'} checked={this.state.mode === ''} emitAction={this.serialize.bind(this)}></Item>
      </div>);
  }

}

class Item extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      checked: props.checked,
    };
  }

  onClick() {
    let { disabled, checked } = this.state;
    checked = !this.props.checked;
    // this.setState({checked});
    console.log(this.props, checked);
    this.props.emitAction(this.props.name, checked);
  }

  render() {
    let { disabled, checked } = this.state;
    return (
      <div className="menu-item">
        <DefaultButton
          disabled={disabled}
          checked={this.props.checked}
          onClick={this.onClick.bind(this)}
        >
          {/* <Icon iconName='Edit'/>*/}
          {this.props.name}
        </DefaultButton>
      </div>);
  }

}


export function mapDispatchToProps(dispatch) {
  return {
    dispatch_mode: (payload) => dispatch(menuAction(payload)),
    dispatch,
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    mode: state.get('canvas').get('mode'),
    isDrawing: state.get('canvas').get('isDrawing'),
  };
};

function menuAction(payload) {
  return {
    type: 'switch-mode',
    payload: payload,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);
