import React from 'react'
import { Line } from 'react-chartjs-2'
import { Row, Col, Typography } from 'antd'
import { Chart, registerables } from 'chart.js'


const { Title } = Typography

type LineChartProps = {
    coinHistory: {
        data: {
            change: String,
            history: any
        }
    },
    coinName: String,
    currentPrice: String,
}

const LineChart = ({coinHistory, coinName, currentPrice}: LineChartProps) => {
    
    const coinPrice = []
    const coinTimestamp = []

    Chart.register(...registerables)

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())  
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }
    
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        display: true,
                        beginAtZero: true,
                        padding: 5,
                        precision: 0,
                    },
                }
            ]
        }
    }

    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>
                    {coinName} Price Chart
                </Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>
                        {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className='current-price' style={{color: 'green'}}>
                        $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} />
        </>
    )
}

export default LineChart
