import { Col, Row, Typography } from 'antd'
import React from 'react'
import { Line }from 'react-chartjs-2' 
import Loader from './Loader';

const LineChart = ({coinHistory, currentPrice, coinName}) => {
  if (!coinHistory) return <Loader />;
  const coinPrice = [];
  const coinTimeStamp = [];
  for(let i = 0; i < coinHistory.prices.length; i++) {
        coinPrice.push(coinHistory.prices[i][1])
        coinTimeStamp.push(new Date(coinHistory.prices[i][0]).toLocaleDateString())
    }
    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price in USD',
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
              beginAtZero: true,
            },
          },
        ],
      },
    };
  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title
            level={5}
            className="price-change"
          ></Typography.Title>
          <Typography.Title level={5} className="current-change">
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
     <Line data={data} options={options} /> 
    </>
  );
}

export default LineChart
