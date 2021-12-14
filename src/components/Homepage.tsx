import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptoStatsQuery, cryptoApi } from '../services/cryptoApi'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { Cryptocurrencies, News } from '../components'
const { Title } = Typography;

const Homepage = () => {


    const { data, isFetching } = useGetCryptoStatsQuery();
    const stats = data?.data

    if (isFetching) {
        return <p>Loading...</p>
    } 
    
    return (
        // <ApiProvider api={cryptoApi}>
            <div className='main-box'>
                {console.log(stats)}
                <Title level={2} className='heading'>Global Crypto Stats</Title>
                <Row>
                    <Col span={12}><Statistic title="Total Cryptocurrencies" value={stats?.totalCoins} /></Col>
                    <Col span={12}><Statistic title="Total Exchanges" value={millify(Number(stats?.totalExchanges))} /></Col>
                    <Col span={12}><Statistic title="Total Market Cap" value={millify(Number(stats?.totalMarketCap))} /></Col>
                    <Col span={12}><Statistic title="Total 24h volume" value={millify(Number(stats?.total24hVolume))} /></Col>
                    <Col span={12}><Statistic title="Total Markets" value={stats?.totalMarkets} /></Col>
                </Row>
                <div className="home-heading-container">
                    <Title level={2} className='home-title'>Top 10 Cryptocurrenices in the world</Title>
                    <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
                </div>
                <Cryptocurrencies simplified={true} />
                <div className="home-heading-container">
                    <Title level={2} className='home-title'>Latest Crypto News</Title>
                    <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
                </div>
                <News simplified={true} />
            </div>
        // </ApiProvider>
    )
}

export default Homepage
