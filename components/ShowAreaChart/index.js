import React from "react";
import {
  Area,
  AreaChart,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import get from 'lodash/get';
import * as dayjs from "dayjs";
let relativeTime = require('dayjs/plugin/relativeTime');
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');
dayjs.extend(relativeTime);


const fakeData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function ShowAreaChart(props) {

  const {
    strokeColor,
    fillColor,
    width } = props;

  let data_list = get(props, "data_list", fakeData);
  let height = get(props, "height", 100);
  /*   let width = get(props, "width", 230);
    let height = get(props, "height", 230); */

  //console.log("screen_with-->",screen_width,screen_size,is_mobil);

  return (
    <ResponsiveContainer height={height}  style={{ margin: 0, padding: 0 }}>
      <AreaChart
        data={data_list}
        style={{ marginTop: 12 }}
      >
        <Area type="monotone" dataKey="uv" stroke={strokeColor} fill={fillColor} />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
};


