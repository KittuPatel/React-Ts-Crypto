import React, { useState } from 'react'
import millify from 'millify'
import { Card, Row, Col, Input } from 'antd'
import { Link } from 'react-router-dom'

import { useGetCryptoCoinsQuery, cryptoApi } from '../services/cryptoApi';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';

const Cryptocurrencies = () => {
    const { data, isFetching } = useGetCryptoCoinsQuery()

    const cryptosData = data?.data
    const coins = cryptosData?.coins
    const [cryptos, setCryptos] = useState(coins)


    if (isFetching) {
        return <p>Loading...</p>
    } 

    return (
        <>
            <Row gutter={[32, 32]} className='crypro-card-container'>
                {/* {console.log(data?.data?.coins)} */}
                {coins && coins.map((currency) => {
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img src={currency.iconUrl} className='crypto-image' /> }
                                hoverable>
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: { millify(currency.change)}% </p>
                            </Card>
                        </Link>
                    </Col>
                })} 
            </Row>
        </>
    )
}

export default Cryptocurrencies
