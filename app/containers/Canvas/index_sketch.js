/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {makeSelect_mode,makeSelect_isDrawing,makeSelect_ui} from './selectors'
import Menu from 'components/menu';
//import {SketchField, Tools} from '../../components/sketch';
import {SketchField, Tools} from 'react-sketch';

import { Stage, Layer, Rect, Image, Group,Path } from 'react-konva';


class Canvas extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      isDrawing: props.isDrawing,
      mode: props.mode,
    };
    this.state={
      stage:{}
    }
    console.log(this.state);
  }

  componentDidMount() {


  }

  onresize = (event) => {
    const { canvas } = this.state;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //this.setState({canvas});
  };


  serialize(){
   /* console.log(this.refs.stage);
    var json = this.refs.stage.node.toJSON();
    console.log(json);*/
  }
  componentWillUnmount(){
    this.props.ui.removeAllListeners()
  }
  render() {
    /* this.setState({
       isDrawing: this.props.isDrawing,
       mode: this.props.mode
     });*/
    const { context, isDrawing, mode } = this.state;
    const { canvas } = this.state;
    console.log(this.props.mode);
    return (
      <div>
        <Menu serialize={this.serialize.bind(this)}></Menu>
        <SketchField width='1024px'
                     height='768px'
                     tool={this.props.mode}
                     lineColor='black'
                     lineWidth={3}/>
      </div>
    );
  }
}

/*
const selectCanvas = (state) => state.get('canvas');
/!*const mapStateToProps = createSelector(
  selectCanvas
);*!/

const mapStateToProps = (state, ownProps) => {
  return {
    mode: state.get('canvas').get('mode'),
    isDrawing: state.get('canvas').get('isDrawing'),
  };
};
*/

const mapStateToProps=createSelector(
  makeSelect_mode(), makeSelect_isDrawing(),makeSelect_ui(),
  (mode,isDrawing,ui) => ({ mode,isDrawing,ui }),
 /* makeSelect_isDrawing(),
  (isDrawing)=>({isDrawing})*/
)

export default connect(mapStateToProps)(Canvas);
