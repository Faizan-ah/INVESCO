import React from "react";
import { Line } from "react-chartjs-2";

class PlotChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: false,
    legendPosition: "right",
  };
  render() {
    return (
      <div>
        <Line
          data={this.state.chartData}
          options={{
            responsive: true,
            // maintainAspectRatio: false,
            title: {
              display: this.props.displayTitle,
              text: "",
              fontSize: 25,
              fontColor: "green",
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
            scales: {
              xAxes: [
                {
                  categoryPercentage: 1.0,
                  barPercentage: 1.0,
                  ticks: {
                    fontSize: 20,
                    fontColor: "black",
                  },
                },
              ],
            },
            canvas: {
              width: 200,
              height: 100,
            },
            layout: {
              padding: {
                top: 5,
                left: 15,
                right: 15,
                bottom: 15,
              },
            },
            tooltips: {
              xPadding: 6,
              yPadding: 6,
            },
            defaultFontSize: 20,
            barValueSpacing: 1,
          }}
        />
      </div>
    );
  }
}
export default PlotChart;
