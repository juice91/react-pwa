import React from 'react';
import { DefaultButton, IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { connect } from 'react-redux';
import menuAction from './actions';

class Item extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
  }
  onClick(){
    let { disabled, checked } = this.state;
    checked=!checked;
    this.setState({checked:checked})
  }
  render(){
    let { disabled, checked } = this.state;
    return (
      <div className="menu-item">
        <DefaultButton
          disabled={ disabled }
          checked={ checked }
          onClick={()=>this.onClick()}
        >
          {/* <Icon iconName='Edit'/>*/}
          {this.props.name}
        </DefaultButton>
      </div>)
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    menuAction: (evt) => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}


export default connect(mapDispatchToProps)(Item);
