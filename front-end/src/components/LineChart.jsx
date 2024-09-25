import React, { PureComponent } from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const data = [
  {
    name: 'July 19',
    Market_Rate: 302,
  },
  {
    name: 'July 20',
    Market_Rate: 315,
  },
  {
    name: 'July 21',
    Market_Rate: 306.1,
  },
  {
    name: 'July 22',
    Market_Rate: 297,
  },
  {
    name: 'July 23',
    Market_Rate: 311,
  },
  {
    name: 'July 24',
    Market_Rate: 292.1,
  },
  {
    name: 'July 25',
    Market_Rate: 299.3,
  }
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', height: '100vh' }}>
        <div style={{ width: '61%', height: 250, marginTop: 'auto', marginBottom: '250px', marginRight: '200px', }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                interval={0}
                style={{ fontSize: '11px', fill: '#ffffff' }} // Set font color to white for X-axis labels
                tick={{ fill: '#ffffff' }} // Ensure tick labels are white
              />
              <YAxis 
                domain={[290, 330]} // Set the domain of the Y-axis
                tickCount={18} // Increased the number of ticks
                style={{ fontSize: '11px', fill: '#ffffff' }} // Set font color to white for Y-axis labels
                tick={{ fill: '#ffffff' }} // Ensure tick labels are white
              />
              <Tooltip 
                contentStyle={{ fontSize: '12px', backgroundColor: '#333', color: '#ffffff' }} // Set tooltip background to dark and text to white
                itemStyle={{ fontSize: '12px', color: '#ffffff' }} // Set tooltip item text to white
              />
              {/* <Legend /> */}
              <Area 
                type="monotone" 
                dataKey="Market_Rate"
                stroke="#87ceeb" 
                fill="#87ceeb" 
                fillOpacity={0.1} 
                strokeWidth={4} // Increased line width
                activeDot={{ r: 8 }} // Increased point size
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    ); 
  }
}