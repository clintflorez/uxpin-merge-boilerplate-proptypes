import React from "react";
import PropTypes from "prop-types";
import AreaChartStyles from "./AreaChart.styles";
import {
  curveCatmullRom,
  curveCatmullRomClosed,
  curveCatmullRomOpen,
  curveBundle,
  curveCardinal,
  curveCardinalOpen,
  curveCardinalClosed
} from "d3-shape";
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  AreaSeries,
  Crosshair
} from "react-vis";

export default class AreaChart extends React.Component {
  constructor(props) {
    super(props);

    const getStartData = () => {
        if(Array.isArray(this.props.startData[0]) && this.props.startData.length === this.props.data.length) {
          return this.props.startData;
        }
        else if(!Array.isArray(this.props.startData[0]) && this.props.startData.length === this.props.data.length) {
          return this.props.startData;
        }
        else {
          return this.props.data
        }
      }

    this.state = {
      data: this.props.startData ? getStartData() : this.props.data,
      crosshairValues: [],
      hintValue: {}
    };
  }
  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  getCrosshair(value, {index}) {
     this.setState({crosshairValues: this.state.data.map(d => d[index])})
  }

  restartCrosshair() {
    this.setState({crosshairValues: []});  
  }

  render() {
    const curve = type => {
      switch (type) {
        case "no curve":
          return "";
        case "curveNatural":
          return type;
        case "curveBasis":
          return type;
        case "curveBasisClosed":
          return type;
        case "curveLinear":
          return type;
        case "curveLinearClosed":
          return type;
        case "curveMonotoneX":
          return type;
        case "curveMonotoneY":
          return type;
        case "curveStep":
          return type;
        case "curveStepAfter":
          return type;
        case "curveStepBefore":
          return type;
        case "curveCatmullRom":
          return curveCatmullRom.alpha(
            parseFloat(this.props.curveCatmullRomAlpha)
          );
        case "curveCatmullRomClosed":
          return curveCatmullRomClosed.alpha(
            parseFloat(this.props.curveCatmullRomAlpha)
          );
        case "curveCatmullRomOpen":
          return curveCatmullRomOpen.alpha(
            parseFloat(this.props.curveCatmullRomAlpha)
          );
        case "curveBundle":
          return curveBundle.beta(parseFloat(this.props.curveBundleBeta));
        case "curveCardinal":
          return curveCardinal.tension(
            parseFloat(this.props.curveCardinalTension)
          );
        case "curveCardinalOpen":
          return curveCardinalOpen.tension(
            parseFloat(this.props.curveCardinalTension)
          );
        case "curveCardinalClosed":
          return curveCardinalClosed.tension(
            parseFloat(this.props.curveCardinalTension)
          );
      }
    };
    return (
      <XYPlot
        height={this.props.height}
        width={this.props.width}
        className={AreaChartStyles}
        onMouseLeave={() => this.restartCrosshair()}
        margin={this.props.margin}
      > 
        {this.props.verticalGridLines ? <VerticalGridLines /> : undefined}
        {this.props.horizontalGridLines ? <HorizontalGridLines /> : undefined}
        {this.props.xLabels ? <XAxis /> : undefined}
        {this.props.yLabels ? <YAxis /> : undefined}
        {!Array.isArray(this.props.data[0]) ? (
          <AreaSeries
          data={this.state.data}
          color={
            this.props.colorRange !== undefined &&
            this.props.colorRange[0]
              ? this.props.colorRange[0]
              : this.props.color
          }
          curve={curve(this.props.curve)}
          opacity={
            this.props.styles !== undefined &&
            this.props.styles[0] &&
            this.props.styles[0].opacity
              ? parseFloat(this.props.styles[i].opacity)
              : parseFloat(this.props.opacity)
          }
          stroke={
            this.props.strokeColorRange !== undefined &&
            this.props.strokeColorRange[0]
              ? this.props.strokeColorRange[0]
              : this.props.strokeColor
          }
          strokeWidth={
            this.props.styles !== undefined &&
            this.props.styles[0] &&
            this.props.styles[0].strokeWidth
              ? this.props.styles[0].strokeWidth
              : this.props.strokeWidth
          }
          strokeStyle={
            this.props.styles !== undefined &&
            this.props.styles[0] &&
            this.props.styles[0].strokeStyle
              ? this.props.styles[0].strokeStyle
              : this.props.strokeStyle
          }
          onNearestX={(value, index) => this.getCrosshair(value, index)}
          onNearestXY={this.props.onNearestXY}
          onSeriesClick={this.props.onSeriesClick}
          onSeriesRightClick={this.props.onSeriesRightClick}
          onSeriesMouseOver={this.props.onSeriesMouseOver }
          onSeriesMouseOut={this.props.onSeriesMouseOver}
          animation={this.props.animation}
          />
        ) : (
          this.state.data.map((e, i) => {
            return (
              <AreaSeries
                key={i}
                data={this.state.data[i]}
                color={
                  this.props.colorRange !== undefined &&
                  this.props.colorRange[i]
                    ? this.props.colorRange[i]
                    : this.props.color
                }
                curve={curve(this.props.curve)}
                opacity={
                  this.props.styles !== undefined &&
                  this.props.styles[i] &&
                  this.props.styles[i].opacity
                    ? parseFloat(this.props.styles[i].opacity)
                    : parseFloat(this.props.opacity)
                }
                stroke={
                  this.props.strokeColorRange !== undefined &&
                  this.props.strokeColorRange[i]
                    ? this.props.strokeColorRange[i]
                    : this.props.strokeColor
                }
                strokeWidth={
                  this.props.styles !== undefined &&
                  this.props.styles[i] &&
                  this.props.styles[i].strokeWidth
                    ? this.props.styles[i].strokeWidth
                    : this.props.strokeWidth
                }
                strokeStyle={
                  this.props.styles !== undefined &&
                  this.props.styles[i] &&
                  this.props.styles[i].strokeStyle
                    ? this.props.styles[i].strokeStyle
                    : this.props.strokeStyle
                }
                onNearestX={(value, index) => this.getCrosshair(value, index)}
                onNearestXY={this.props.onNearestXY}
                onSeriesClick={this.props.onSeriesClick}
                onSeriesRightClick={this.props.onSeriesRightClick}
                onSeriesMouseOver={this.props.onSeriesMouseOver }
                onSeriesMouseOut={this.props.onSeriesMouseOver}
                animation={this.props.animation}
              />
            );
          })
        )}
        {this.props.crossHair ? <Crosshair values={this.state.crosshairValues} /> : undefined}
      </XYPlot>
    );
  }
}

AreaChart.propTypes = {
  /** Width of the Chart in px. Accepts only numbers. */
  width: PropTypes.number,
  /** Height of the Chart in px. Accepts only numbers. */
  height: PropTypes.number,
  /** Sets margin for the chart inside of the container. Format: {"top": 0, "right": 0, "bottom": 0, "left": 0 } */
  margin: PropTypes.shape({left: PropTypes.number, right: PropTypes.number, top: PropTypes.number, bottom: PropTypes.number}),
  /** Turns on/off horizontal labels. */
  xLabels: PropTypes.bool,
  /** Turns on/off vertical labels. */
  yLabels: PropTypes.bool,
  /** Turns on/off horizontal grid lines. */
  horizontalGridLines: PropTypes.bool,
  /** Turns on/off vertical grid lines. */
  verticalGridLines: PropTypes.bool,
  /** Data Array. Structure: [[{"x": 0, "y": 1}, {"x": 1, "y": 3}], [{"x: 0", "y": 2}, {"x": 1, "y": 3]].  */
  data: PropTypes.array,
  /** Starting point for data set. Used for triggering animation. Same data structure as data property. */
  startData: PropTypes.array,
  /** Turns, on/off animation and allows for selection of different types of animations. */
  animation: PropTypes.oneOf([false, "noWobble", "gentle", "wobbly", "stiff"]),
  /** Color to be used on all chart lines, unless colorRange is provided */
  color: PropTypes.string,
  /** Array with colors to be used across all chart lines. If array doesn't specify color for all the chart lines, color property is used. */
  colorRange: PropTypes.arrayOf(PropTypes.string),
  /** Specifies opacity for all the chart lines, unless styles array is provided */
  opacity: PropTypes.string,
  /** Color of the upper edge of the area. Overrides color property/ */
  strokeColor: PropTypes.string,
  /** Array of colors of the upper edge of the area. Overrides color property/ */
  strokeColorRange: PropTypes.arrayOf(PropTypes.string),
  /** Specifies width of the line for all the chart lines, unless styles array is provided */
  strokeWidth: PropTypes.number,
  /** Specifies style of the line for all the chart lines, unless styles array is provided */
  strokeStyle: PropTypes.oneOf(["solid", "dashed"]),
  /** Select the kind of curve for all the chart lines */
  curve: PropTypes.oneOf([
    "no curve",
    "curveNatural",
    "curveBasis",
    "curveBasisClosed",
    "curveLinear",
    "curveLinearClosed",
    "curveMonotoneX",
    "curveMonotoneY",
    "curveStep",
    "curveStepAfter",
    "curveStepBefore",
    "curveCatmullRom",
    "curveCatmullRomOpen",
    "curveCatmullRomClosed",
    "curveBundle",
    "curveCardinal",
    "curveCardinalOpen",
    "curveCardinalClosed"
  ]),
  /** Additional param to modify the curvature of curveCatmullRom, curveCatmullRomOpen and curveCatmullRomClosed  */
  curveCatmullRomAlpha: PropTypes.string,
  /** Additional param to modify the curvature of curveBundleBeta */
  curveBundleBeta: PropTypes.string,
  /** Additional param to modify the curvature of curveCardinal, curveCardinalOpen, curveCardinalClosed */
  curveCardinalTension: PropTypes.string,
  /** Object with styles that allows for specifying styles for every line separtely. Accepts: StrokeStyle, StrokeWidth and Opacity. Format: [{"strokeStyle": "solid"}] */
  styles: PropTypes.arrayOf(PropTypes.object),
  /** Turns on/off crossHair */
  crossHair: PropTypes.bool,
  onNearestXY: PropTypes.func,
  onSeriesClick: PropTypes.func,
  onSeriesMouseOver: PropTypes.func,
  onSeriesMouseOut: PropTypes.func,
  onSeriesRightClick: PropTypes.func
};

AreaChart.defaultProps = {
  width: 300,
  height: 300,
  xLabels: true,
  yLabels: true,
  verticalGridLines: true,
  horizontalGridLines: true,
  strokeWidth: 3,
  strokeStyle: "solid",
  crossHair: false
};
