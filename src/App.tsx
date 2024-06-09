import { DatePickerInput } from "@mantine/dates";
import * as echarts from "echarts";
import { useEffect } from "react";

import Papa from "papaparse";

async function parseCSVFile(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      download: true,
      complete: function (results) {
        const categoryData = results.data.map((row) => row.Date);
        const values = results.data.map((row) =>
          [row.Open, row.Close, row.Low, row.High].map(Number)
        );

        resolve({ categoryData, values });
      },
      error: reject,
    });
  });
}

function App() {
  useEffect(() => {
    parseCSVFile("/VFS_historical_data_StockScan.csv")
      .then((data0) => {
        var chartDom = document.getElementById("chart");
        var myChart = echarts.init(chartDom);
        var option;

        const upColor = "#ec0000";
        const upBorderColor = "#8A0000";
        const downColor = "#00da3c";
        const downBorderColor = "#008F28";

        option = {
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
            left: "10%",
            right: "10%",
            bottom: "15%",
          },
          xAxis: {
            type: "category",
            data: data0.categoryData,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: "dataMin",
            max: "dataMax",
          },
          yAxis: {
            scale: true,
            splitArea: {
              show: true,
            },
            position: "right",
          },

          series: [
            {
              name: "日K",
              type: "candlestick",
              data: data0.values,
              itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor,
              },
            },
          ],
        };

        option && myChart.setOption(option);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex justify-end gap-2 w-full">
        <DatePickerInput valueFormat="YYYY-MM-DD" label="sss" w={300} />
      </div>
      <div className="flex-1" id="chart"></div>
    </div>
  );
}

export default App;
