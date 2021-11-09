import { Col, Collapse, Row, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import millify from 'millify'
import React from 'react'
import { useGetCryptoExchangeQuery } from '../services/apiSlice'
import Loader from './Loader'
const Exchanges = () => {
    const { data, isFetching } = useGetCryptoExchangeQuery()
    if(isFetching) return <Loader />;
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Exchanges</h1>
        <Row>
          <Col span={6}>Exchanges</Col>
          <Col span={6}>Year Established</Col>
          <Col span={6}>Country</Col>
          <Col span={6}>Trade volume 24h btc</Col>
        </Row>
        <Row>
          {data.map((exchange) => (
            <Col span={24}>
              <Collapse>
                <CollapsePanel
                  key={exchange.id}
                  showArrow={false}
                  header={
                    <Row key={exchange.id}>
                      <Col span={6}>
                        <Typography.Text>
                          <strong>{exchange.trust_score_rank}</strong>
                        </Typography.Text>
                        <Avatar
                          className="exchange-image"
                          src={exchange.image}
                        />
                        <Typography.Text>
                          <strong>{exchange.name}</strong>
                        </Typography.Text>
                      </Col>
                      <Col span={6}>{exchange.year_established}</Col>
                      <Col span={6}>{exchange.country}</Col>
                      <Col span={6}>
                        {millify(exchange.trade_volume_24h_btc)}
                      </Col>
                    </Row>
                  }
                >
                  <a href={exchange.url} target='_blank' rel='noreferrer'>
                    <p>{exchange.name} link</p>
                  </a>
                </CollapsePanel>
              </Collapse>
            </Col>
          ))}
        </Row>
      </>
    );
}

export default Exchanges
