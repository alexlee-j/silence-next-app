export type monitorChartType = {
  xAxisArr: string[];
  seriesArr: number[];
};

export type InformationData = {
  key: string;
  label: string;
  value?: string;
  needIcon?: boolean;
  popOverContent?: string;
};
