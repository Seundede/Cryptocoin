import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Col, Row, Statistic, Typography } from "antd";
import { useGetCryptoGlobalQuery } from "../services/apiSlice";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "./Loader";

const Home = () => {
  const { data, isFetching } = useGetCryptoGlobalQuery();

  if (isFetching) return <Loader />;
  return (
    <>
      <Typography.Title className="heading" level={2}>
        Global Crypto Stats
      </Typography.Title>

      <Row>
        <Col span={12}>
          <Statistic
            title="Active Cryptocurrencies"
            value={data.data.active_cryptocurrencies}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Ended Icos" value={data.data.ended_icos} />
        </Col>
        <Col span={12}>
          <Statistic title="Ongoing Icos" value={data.data.ongoing_icos} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap USD"
            value={millify(data.data.total_market_cap.usd)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={data.data.markets} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={3} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Typography.Title>
        <Typography.Title level={4} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Typography.Title>
      </div>
      <Cryptocurrencies simplified />
    
      <div className="home-heading-container">
        <Typography.Title level={3} className="home-title">
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={4} className="show-more">
          <Link to="/news">Show More</Link>
        </Typography.Title>
      </div>
      <News simplified />
    </>
  );
};

export default Home;
