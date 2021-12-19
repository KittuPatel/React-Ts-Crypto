import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Card, Row, Col, Input } from 'antd'
import { Link } from 'react-router-dom'

import { useGetCryptoCoinsQuery } from '../services/cryptoApi';
// import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
// import { Axios } from 'axios';
import Loader from './Loader';

type CryptocurrenciesProps = {
    simplified: boolean
}

const Cryptocurrencies = (props: CryptocurrenciesProps) => {
    const count:number = props.simplified ? 10 : 50 
    const { data, isFetching } = useGetCryptoCoinsQuery(count)
    const cryptosData = data?.data
    const coins = cryptosData?.coins
    const [cryptos, setCryptos] = useState(coins)
    const [searchTerm, setSearchTerm] = useState<string>('')

    useEffect(() => {

        const filteredData:any = coins?.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
        filteredData ? setCryptos(filteredData) : <Loader />

    }, [cryptosData, searchTerm, coins])
    
    if (isFetching) {
        return <Loader />   
    } 

    return (
        <>
            { !props.simplified && (<div className="search-crypto">
                <Input placeholder='Search Crypto' onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>)}
            <Row gutter={[10, 10]} className='crypto-card-container'>
                {/* {console.log(data?.data?.coins)} */}
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img src={currency.iconUrl} className='crypto-image' alt='img' />}
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
