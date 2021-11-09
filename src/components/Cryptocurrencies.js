import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/apiSlice";
import { Card, Col, Input, Row } from "antd";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const { data, isFetching } = useGetCryptosQuery({count: simplified ? 10 : 100});

  const [searchTerm, setSearchTerm] = useState("");
  const [crypto, setCrypto] = useState(data);

  useEffect(() => {
    if (searchTerm.length < 1) {
      return;
    }

    const filteredData = crypto.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCrypto(filteredData);
  }, [searchTerm, crypto]);

  if (isFetching) return <Loader />;

  if (!crypto) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {data.map((currency, index) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={index}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.market_cap_rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.image}
                    alt="currency"
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.current_price)}</p>
                <p>Market Cap: {millify(currency.market_cap)}</p>
                <p>Daily Change: {millify(currency.price_change_24h)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
