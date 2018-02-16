import React from 'react';
import styled from 'styled-components';


import { DefaultButton, IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';


const Block = styled.div`
  width:1vw;
  height:1vw;
`;
export default class Menu extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
   return (
     <div className="menu">
      <Item name={'Brush'}></Item>
       <Item name={'Eraser'}></Item>
    </div>)
  }

}

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
