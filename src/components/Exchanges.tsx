import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Space, Table } from 'antd';
import ReactHtmlParser from 'react-html-parser'
import { useGetCryptoExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const columns = [
    { title: 'Exchanges', dataIndex: 'name', key: 'name' },
    { title: '24h Trade Volume', dataIndex: 'volume', key: 'volume' },
    { title: 'Markets', dataIndex: 'numberOfMarkets', key: 'numberOfMarkets' },
    { title: 'Change', dataIndex: 'marketShare', key: 'marketShare' },
  ];

const Exchanges = () => {
    const { data, isFetching } = useGetCryptoExchangesQuery('exchanges');
    const exchangesList = data?.data?.exchanges;
    const exchanges:any = []
    
    if (isFetching) return <Loader />;

    exchangesList.map((element:any) => (
        exchanges.push({
            id: element.id,
            name: element.name,
            description: element.description,
            iconUrl: element.iconUrl,
            volume: element.volume,
            numberOfMarkets: element.numberOfMarkets,
            marketShare: element.marketShare,
            rank: element.rank
        })
    )) 
    
  return (
    <>
        <Table
            columns={columns}
              expandable={{
                expandedRowRender: record => ReactHtmlParser(record.description || ''),
                // rowExpandable: ,
                expandRowByClick: true
             }}
            dataSource={exchanges}
        />
    </>
  );
};

export default Exchanges;