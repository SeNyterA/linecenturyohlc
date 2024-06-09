/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import Papa from "papaparse";
import { useEffect, useState } from "react";

interface Data {
  categoryData: string[];
  values: number[][];
  startDate: string;
  endDate: string;
}

const useChartData = (file: string) => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const parseCSVFile = async (): Promise<Data> => {
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          download: true,
          complete: function (results) {
            const sortedData = results.data.sort((a: any, b: any) =>
              dayjs(a.Date).isBefore(dayjs(b.Date)) ? -1 : 1
            );
            const categoryData = sortedData.map((row: any) => row.Date);
            const values = sortedData.map((row: any) =>
              [row.Open, row.Close, row.Low, row.High].map(Number)
            );
            if (values[values.length - 1].some(Number.isNaN)) {
              values.pop();
              categoryData.pop();
            }

            const startDate = categoryData[0];
            const endDate = categoryData[categoryData.length - 1];

            resolve({ categoryData, values, startDate, endDate });
          },
          error: reject,
        });
      });
    };

    parseCSVFile().then(setData);
  }, [file]);

  return data;
};

export default useChartData;
