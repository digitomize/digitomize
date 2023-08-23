import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const user = [
  { language: 'HTML', percentage: 40 },
  { language: 'JavaScript', percentage: 10 },
  { language: 'TypeScript', percentage: 20 },
  { language: 'Java', percentage: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, language, percentage }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * .7; // Adjust the label distance
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  const lineLength = outerRadius + 45; // Increased line length
  
  const startX = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
  const startY = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);
  
  const endX = cx + lineLength * Math.cos(-midAngle * RADIAN); // Increased line length
  const endY = cy + lineLength * Math.sin(-midAngle * RADIAN); // Increased line length

  return (
    <g>
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text x={endX} y={endY} fill={COLORS[index % COLORS.length]} textAnchor={midAngle > 180 ? 'end' : 'start'} dominantBaseline="central">
        {language}
      </text>
      <line x1={startX} y1={startY} x2={endX} y2={endY} stroke={COLORS[index % COLORS.length]} strokeWidth="2" />
    </g>
  );
};

export default function Piechart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={user}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="percentage"
        >
          {user?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
