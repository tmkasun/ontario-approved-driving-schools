import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import HRNumbers from "human-readable-numbers";

import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);

const TOTAL_POPULATION = 21919000;
var labelOption = {
  show: true,
  position: "inside",
  formatter: (params) => {
    const { value, seriesName } = params;
    const humanNumber = HRNumbers.toHumanString(params.value);

    if (seriesName === "Population") {
      return `${seriesName}\n${humanNumber}`;
    } else {
      return `${seriesName}\n${humanNumber}  {percentage|(${(
        (value / TOTAL_POPULATION) *
        100
      ).toFixed(2)}%)}`;
    }
  },
  fontSize: 19,
  rich: {
    percentage: {
      color: "#B03A5B",
      lineHeight: 22,
      fontSize: 20
    }
  }
};

const REBarChart = (props) => {
  const chartRef = useRef(null);
  const chartRefInst = useRef(null);
  const { id, data } = props;
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      data: ["Population", "1st Dose", "2nd Dose"]
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: ["Comparison"]
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "Population",
        type: "bar",
        barGap: 0,
        label: labelOption,
        emphasis: {
          focus: "series"
        },
        data: [TOTAL_POPULATION]
      },
      {
        name: "1st Dose",
        type: "bar",
        label: labelOption,
        emphasis: {
          focus: "series"
        },
        data: [data.cum_total_dose1]
      },
      {
        name: "2nd Dose",
        type: "bar",
        label: labelOption,
        emphasis: {
          focus: "series"
        },
        data: [data.cum_total_dose2]
      }
    ]
  };
  useEffect(() => {
    if (chartRefInst.current) {
      chartRefInst.current.setOption(options, true);
    }
  }, [data]);
  useEffect(() => {
    console.log(chartRef.current);
    if (chartRef.current) {
      const barChart =
        echarts.getInstanceByDom(chartRef.current) ||
        echarts.init(chartRef.current);
      barChart.setOption(options, true);
      chartRefInst.current = barChart;
    }
  }, []);
  return (
    <div id={id} ref={chartRef} style={{ width: "100%", height: "80vh" }} />
  );
};

export default REBarChart;
