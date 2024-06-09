import { useEffect, useRef } from "react";
import Chart from "./chart";

export default function useChart(wrapperId: string) {
  const chartRef = useRef<Chart | null>(null);
  useEffect(() => {
    const chartDom = document.getElementById(wrapperId);
    if (!chartDom) throw new Error(`Element with id ${wrapperId} not found`);
    chartRef.current = new Chart(chartDom as HTMLDivElement);
  }, [wrapperId]);
  return chartRef.current;
}
