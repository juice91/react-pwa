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
import { Stage, Layer, Rect, Image, Group,Path } from 'react-konva';


class Canvas extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    console.log(props);
    /*this.state = {
      isDrawing: props.isDrawing,
      mode: props.mode,
    };*/
    this.state={
      stage:{}
    }
    console.log(this.state);

  }

  componentDidMount() {

    this.props.ui.on('command',(...args)=>{
      console.log(args);
    })

    const canvas = document.createElement('canvas');
    canvas.width = 1920//window.innerWidth;
    canvas.height = 1080//window.innerHeight;
    const context = canvas.getContext('2d');

    this.setState({ canvas, context });

    // window.addEventListener('resize', this.onresize);
  }

  onresize = (event) => {
    const { canvas } = this.state;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //this.setState({canvas});
  };

  handleMouseDown = () => {
    // console.log("mousedown");
    this.setState({ isDrawing: true });
    console.log(this.props.mode);
    /*this.state.stage.push({
      name:'line',active:true
    })*/

    // TODO: improve
    const stage = this.image.parent.parent;
    this.lastPointerPosition = stage.getPointerPosition();



  };

  handleMouseUp = () => {
    const { context, isDrawing, mode } = this.state;
    //  console.log("mouseup");
    this.setState({ isDrawing: false });
    this.serialize();
  let save=context.save();
  console.log(save)
  };

  handleMouseMove = () => {
    // console.log('mousemove');
    const { context, isDrawing, mode } = this.state;

    if (isDrawing) {
      //  console.log("drawing");

      // TODO: Don't always get a new context
      context.strokeStyle = '#df4b26';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      if (this.props.mode === 'Brush') {
        context.globalCompositeOperation = 'source-over';
        context.lineWidth = 25;
      } else if (this.props.mode === 'Eraser') {
        context.globalCompositeOperation = 'destination-out';
        context.lineWidth = 50;
      }

      if (this.props.mode === 'Brush' || this.props.mode === 'Eraser') {
        context.beginPath();

        var localPos = {
          x: this.lastPointerPosition.x - this.image.x(),
          y: this.lastPointerPosition.y - this.image.y(),
        };
        //   console.log("moveTo", localPos);
        context.moveTo(localPos.x, localPos.y);

        // TODO: improve
        const stage = this.image.parent.parent;

        var pos = stage.getPointerPosition();
        localPos = {
          x: pos.x - this.image.x(),
          y: pos.y - this.image.y(),
        };
        //   console.log("lineTo", localPos);
        context.lineTo(localPos.x, localPos.y);
        context.closePath();
        context.stroke();
        this.lastPointerPosition = pos;
        this.image.getLayer().draw();
      }
      //  console.log( context.globalCompositeOperation);

    }
  };
  serialize(){
    console.log(this.refs.stage);
    var json = this.refs.stage.node.toJSON();
    console.log(json);
  }
  componentWillUnmount(){
    this.props.ui.removeAllListeners()
  }
  render() {
    /* this.setState({
       isDrawing: this.props.isDrawing,
       mode: this.props.mode
     });*/
    const { canvas } = this.state;
    return (
      <div>
        <Menu serialize={this.serialize.bind(this)}></Menu>
        <Stage ref="stage" width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Image
              image={canvas}
              ref={node => (this.image = node)}
              width={canvas.width}
              height={canvas.height}
              stroke="blue"
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              onMouseMove={this.handleMouseMove}
            />
            <Path
            x={50}
            y={40}
            data="M12.582,100,200,300,400,200,333,333,222,111,444"
            fill="green"
            />



          </Layer>
        </Stage>
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
