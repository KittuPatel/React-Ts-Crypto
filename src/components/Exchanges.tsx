import React from 'react';
import millify from 'millify';
import { Table } from 'antd';
import ReactHtmlParser from 'react-html-parser'
import { useGetCryptoExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

// const { Text } = Typography;
// const { Panel } = Collapse;

const columns = [
    { title: 'Logo', dataIndex: 'iconUrl', key: 'iconUrl' },
    { title: 'Exchange Name', dataIndex: 'name', key: 'name' },
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
            key: element.id,
            name: element.name,
            description: element.description,
            iconUrl: <img src={element.iconUrl} width={30} alt="logo" /> ,
            volume: millify(element.volume),
            numberOfMarkets: millify(element.numberOfMarkets),
            marketShare: millify(element.marketShare),
            rank: element.rank
        })
    )) 
    
  return (
    <>
        <Table
              columns={columns}
              expandable={{
                 expandedRowKeys: exchanges.id,
                 expandedRowRender: record => ReactHtmlParser(record.description || ''),
                 rowExpandable: record => record.name !== "Not Expandable",
                 expandRowByClick: true
             }}
            dataSource={exchanges}
        />
    </>
  );
};

export default Exchanges;