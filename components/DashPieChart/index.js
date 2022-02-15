import React, { Component } from 'react';
import { PieChart, Pie, Sector, Legend, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Com propostas', value: 400 },
    { name: 'Encerradas', value: 300 },
    { name: 'Sem propostas', value: 300 },
];
const COLORS = ['#FFBB28', '#0088FE', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text fill="black" >
            {`oi`}
        </text>
    );
};

export default function DashPieChart({height}) {
    return (
        <ResponsiveContainer height={height}>
            <PieChart>
                <Pie
                    labelLine={false}
                    label={renderCustomizedLabel}
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

                <Legend layout="vertical" verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    );
}
