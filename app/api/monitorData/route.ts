import { NextResponse } from "next/server";

type monitorChartType = {
  xAxisArr: string[];
  seriesArr: number[];
};

const monitorData: monitorChartType = {
  xAxisArr: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  seriesArr: [820, 932, 901, 934, 701, 903, 609],
};
export async function GET() {
  return NextResponse.json(monitorData);
}
