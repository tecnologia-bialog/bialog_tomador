import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        female: 2400,
        male: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        female: 1398,
        male: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        female: 9800,
        male: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        female: 3908,
        male: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        female: 4800,
        male: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        female: 3800,
        male: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        female: 4300,
        male: 2100,
    },
];



export default function CircularBarChart({ height }) {
    return (
        <ResponsiveContainer height={height}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
         
                barSize={30}
            >
                <CartesianGrid vertical={false}/>
                <XAxis tickLine={false} axisLine={false} dataKey="name" />
                <YAxis tickLine={false} axisLine={false}/>
                <Bar dataKey="female" stackId="a" fill="#3f96f3" radius={[0, 0, 20, 20]} ></Bar>
                <Bar dataKey="male" stackId="a" fill="#dee9f5" radius={[20, 20, 0, 0]}></Bar>

                <Legend verticalAlign="bottom" height={36} />

            </BarChart>
        </ResponsiveContainer>
    );
}
//#3f96f3