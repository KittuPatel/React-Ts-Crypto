import React from 'react'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

type NewsProps = {
    simplified: boolean
}

const News = (props: NewsProps) => {
    
    const { data, isFetching } = useGetCryptoNewsQuery({
        newsCategory: 'Cryptocurrency',
        count: props.simplified ? 10 : 50
    })
    if (isFetching) {
        return <p>Loading..</p>
    }
    return (
        <div>
            <p>News</p>
            {console.log(data)}
        </div>
    )
}

export default News
