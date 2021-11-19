import React, { Component } from 'react'
import '../Chart/styles.css';
import { XAxis, CartesianGrid, Tooltip, BarChart, ResponsiveContainer, Bar,YAxis, Legend } from 'recharts';

export default class BChart extends Component {
    render() {
        const { title, data, dataKey, grid } = this.props;
        return (
            <div className="chart">
                <h3 className="chartTitle">
                    {title}
                    <ResponsiveContainer width="100%" aspect={4 / 1}>
                        <BarChart data={data}>
                        {grid&&<CartesianGrid strokeDasharray="3 3" />}
                        <XAxis dataKey="fullName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                            <Bar dataKey={dataKey} fill="#5550bd"/>
                        </BarChart>
                    </ResponsiveContainer>
                </h3>
            </div>
        )
    }
}
