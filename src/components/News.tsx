import React, { useState } from 'react'
import { Select, Typography, Row, Col, Card, Avatar } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptoCoinsQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Text, Title } = Typography
const { Option } = Select

type NewsProps = {
    simplified: boolean
}

const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"

const News = (props: NewsProps) => {
    
    const [newsCategory, setNewsCategory] = useState<any>('Cryptocurrency')

    const { data: Cryptocurrencies } = useGetCryptoCoinsQuery(100)

    const { data } = useGetCryptoNewsQuery({
        newsCategory,
        count: props.simplified ? 6 : 30
    })

    if (!data?.value) return <Loader />
    
    return (
        <Row gutter={[24, 24]}>
            {!props.simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption= {(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}  
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {Cryptocurrencies?.data?.coins.map((coin) => (
                            <Option value={coin.name}>{ coin.name }</Option>
                        ))}
                    </Select>
                </Col>
            )}
            {data.value.map((news:any, index:number) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className='news-title' level={4}>
                                    {news.name}
                                </Title>
                                <img style={{maxHeight: '80px', maxWidth:'120px', borderRadius: '50%'}} src={news?.image?.thumbnail?.contentUrl || demoImage } alt='news' />
                            </div>
                            <p>
                                {news.description > 100 
                                    ? `${news.description.substring(0, 100)}...`
                                    :  news.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage } alt='News'/>
                                    <Text className='provider-name'>{ news.provider[0]?.name }</Text>
                                </div>
                                <Text>{ moment(news.datePublished, 'ss').fromNow() }</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
        // <>
        //     {console.log(data)}
        // </>
    )
}

export default News
