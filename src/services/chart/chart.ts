import * as echarts from "echarts";

interface IChart {
  categoryData: string[];
  values: number[][];
  startDate: string;
  endDate: string;
}

class Chart {
  private chart: echarts.ECharts;
  private upColor = "#ec0000";
  private upBorderColor = "#8A0000";
  private downColor = "#00da3c";
  private downBorderColor = "#008F28";

  constructor(private chartDom: HTMLElement) {
    this.chart = echarts.init(this.chartDom, "dark");
    window.addEventListener("resize", () => {
      this.chart.resize();
    });
  }

  setOption(data: Data) {
    const filteredCategoryData = data.categoryData.filter(
      (date) => date >= data.startDate && date <= data.endDate
    );
    const filteredValues = data.values.filter(
      (_, index) =>
        data.categoryData[index] >= data.startDate &&
        data.categoryData[index] <= data.endDate
    );

    const option = {
      title: {
        text: "",
        left: 0,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      grid: {
        left: "20px",
        right: "20px",
        bottom: "20px",
      },
      xAxis: {
        type: "category",
        data: filteredCategoryData,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
        axisLabel: {
          interval: Math.floor(filteredCategoryData.length / 6),
        },
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true,
        },
        position: "right",
        axisLabel: {
          formatter: (value: number) => `$${value}`,
        },
      },
      series: [
        {
          name: "LineCentury",
          type: "candlestick",
          data: filteredValues,
          itemStyle: {
            color: this.upColor,
            color0: this.downColor,
            borderColor: this.upBorderColor,
            borderColor0: this.downBorderColor,
            width: "auto",
            maxWidth: 20,
          },
        },
      ],
    };

    this.chart.setOption(option);
    return this;
  }
}

export default Chart;
export type Data = IChart;
