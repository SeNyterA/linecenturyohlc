/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useChart from "./services/chart/useChart";
import useChartData from "./services/chart/useChartData";

const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const chart = useChart("chart");
  const chartData = useChartData("/VFS_historical_data_StockScan.csv");

  useEffect(() => {
    if (!chart || !chartData) return;
    const formattedStartDate = startDate
      ? dayjs(startDate).format("YYYY-MM-DD")
      : chartData.startDate;
    const formattedEndDate = endDate
      ? dayjs(endDate).format("YYYY-MM-DD")
      : chartData.endDate;
    chart?.setOption({
      categoryData: chartData.categoryData,
      values: chartData.values,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  }, [chartData, startDate, endDate, chart]);

  return (
    <div className="h-screen w-screen flex flex-col p-10">
      <div className="flex justify-end gap-2 w-full">
        <DatePickerInput
          leftSection={<IconCalendar size={14} />}
          placeholder="YYYY-MM-DD"
          valueFormat="YYYY-MM-DD"
          value={startDate}
          onChange={(e) => setStartDate(e!)}
          clearable
          minDate={dayjs(chartData?.startDate).toDate()}
          maxDate={
            endDate && dayjs(endDate).isBefore(dayjs(chartData?.endDate))
              ? dayjs(endDate).toDate()
              : dayjs(chartData?.endDate).toDate()
          }
        />
        <DatePickerInput
          leftSection={<IconCalendar size={14} />}
          placeholder="YYYY-MM-DD"
          valueFormat="YYYY-MM-DD"
          value={endDate}
          onChange={(e) => setEndDate(e!)}
          clearable
          minDate={
            startDate && dayjs(startDate).isAfter(dayjs(chartData?.startDate))
              ? dayjs(startDate).toDate()
              : dayjs(chartData?.startDate).toDate()
          }
          maxDate={dayjs(chartData?.endDate).toDate()}
        />
      </div>
      <div className="flex-1" id="chart"></div>
    </div>
  );
};

export default App;
