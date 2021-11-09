import React, { useState } from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailsQuery } from "../services/apiSlice";
import { useGetCryptoHistoryQuery } from "../services/apiSlice";
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Col, Row, Select, Typography } from "antd";
import LineChart from "./LineChart";
import Loader from "./Loader";

const CryptoDetails = () => {
  const time = ["3h", "24h",'2d', "7d", '14d',"30d"];
  const { Option } = Select; 
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data = {}, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId,timePeriod });
  console.log(coinHistory)
  console.log('1')
  if (Object.keys(data).length < 1) return <Loader />;
 if (!coinHistory) return <Loader />;
console.log("100");
  const stats = [
    {
      title: "Price to USD",
      value: data.market_data.current_price.usd,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: data.market_cap_rank,
      icon: <NumberOutlined />,
    },
    {
      title: "24h Volume",
      value: millify(data.market_data.market_cap_change_24h),
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: millify(data.market_data.market_cap.usd),
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: millify(data.market_data.high_24h.usd),
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Low 24h",
      value: millify(data.market_data.low_24h.usd),
      icon: <FundOutlined />,
    },
    {
      title: "Fully Diluted Valuation",
      value: millify(data.market_data.fully_diluted_valuation.usd),
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Total Volume",
      value: millify(data.market_data.total_volume.usd) ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: millify(data.market_data.total_supply),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: millify(data.market_data.circulating_supply),
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Typography.Title level={2} className="coin-name">
            {data.name} Price
          </Typography.Title>
          <p>
            {data.name} live price in US dollars. View value statistics, market
            cap and supply.
          </p>
        </Col>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Time Period"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date, index) => (
            <Option key={index}>{date} </Option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(data.market_data.current_price.usd)}
          coinName= {data.name}
        />
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Typography.Title level={3} className="coin-details-heading">
                {data.name} Value Statistics
              </Typography.Title>
              <p>
                An overview showing the statistics of {data.name}, such as the
                base and quote currency, the rank, and trading volume.
              </p>
            </Col>

            {stats.map((stat) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Typography.Text>{stat.icon}</Typography.Text>
                  <Typography.Text>{stat.title}</Typography.Text>
                </Col>
                <Typography.Text className="stats">
                  {stat.value}
                </Typography.Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Typography.Title level={3} className="coin-details-heading">
                Other Statistics
              </Typography.Title>
              <p>
                An overview showing the statistics of other cryptocurrencies.
              </p>
            </Col>

            {genericStats.map((stat) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Typography.Text>{stat.icon}</Typography.Text>
                  <Typography.Text>{stat.title}</Typography.Text>
                </Col>
                <Typography.Text className="stats">
                  {stat.value}
                </Typography.Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Typography.Title level={4} className="coin-details-heading">
              What is {data.name}?
            </Typography.Title>
            {HTMLReactParser(data.description.en)}
          </Row>
          <Col className="coin-links">
            <Typography.Title level={3} className="coin-details-heading">
              {data.name} Links
            </Typography.Title>
            <a href={data.links.homepage[0]} target="_blank" rel="noreferrer">
              {data.name} homepage
            </a>
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetails;
