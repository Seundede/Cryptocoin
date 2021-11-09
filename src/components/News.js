import React from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/newsSlice";
import { Card, Col, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Loader from "./Loader";

const demo = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
const News = ({ simplified }) => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 8 : 20,
  });

  if (!cryptoNews?.value) return <Loader  />;
  return (
    <>
      {!simplified && <h2 style={{ textAlign: "center", marginBottom: '30px', fontSize: '25px' }}>Cypto-news</h2>}

      <Row gutter={[24, 24]}>
        {cryptoNews.value.map((news, id) => (
          <Col xs={24} sm={12} lg={10} key={id}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Typography.Title className="news-title" level={4}>
                    {news.name}
                  </Typography.Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demo}
                    alt="news"
                    style={{objectFit:'contain'}}
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}{" "}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl || demo
                      }
                      alt=""
                    />
                    <Typography.Text className="provider-name">
                      {news.provider[0]?.name}
                    </Typography.Text>
                  </div>
                  <Typography.Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Typography.Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
