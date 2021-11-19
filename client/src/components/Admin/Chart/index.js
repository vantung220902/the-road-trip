import React, { Component } from 'react'
import './styles.css';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class Chart extends Component {
    render() {
        const { title, data, dataKey, grid } = this.props;
        return (
            <div className="chart">
                <h3 className="chartTitle">
                    {title}
                    <ResponsiveContainer width="100%" aspect={4 / 1}>
                        <LineChart data={data}>
                            <XAxis dataKey="month" stroke="#5550bd" />
                            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" activeDot={{ r: 8 }} />
                            <Tooltip />
                            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                        </LineChart>
                    </ResponsiveContainer>
                </h3>
            </div>
        )
    }
}
