import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Card, Row, Col, Input } from 'antd'
import { Link } from 'react-router-dom'

import { useGetCryptoCoinsQuery, cryptoApi } from '../services/cryptoApi';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { Axios } from 'axios';

type CryptocurrenciesProps = {
    simplified: boolean
}

const Cryptocurrencies = (props: CryptocurrenciesProps) => {
    const count:number = props.simplified ? 10 : 50 
    const { data, isFetching, isSuccess } = useGetCryptoCoinsQuery(count)
    const cryptosData = data?.data
    const coins = cryptosData?.coins
    const [cryptos, setCryptos] = useState(coins)
    const [searchTerm, setSearchTerm] = useState<string>('')

    useEffect(() => {

        const filteredData:any = coins?.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
        filteredData ? setCryptos(filteredData) : <p>loading</p>

    }, [cryptosData, searchTerm])
    
    if (isFetching) {
        return <p>Loading...</p>
    } 

    return (
        <>
            <div className="search-crypto">
                <Input placeholder='Search Crypto' onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <Row gutter={[10, 10]} className='crypto-card-container'>
                {/* {console.log(data?.data?.coins)} */}
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img src={currency.iconUrl} className='crypto-image' />}
                                hoverable>
                                <p>Price: ${millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}% </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies
