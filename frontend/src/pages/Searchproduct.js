import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summeryApi from '../common'
import Verticalcard from '../component/Verticalcard'

export default function Searchproduct() {

    const query = useLocation()
    // console.log("query",query.search)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchproduct = async () => {
        setLoading(true)
        const response = await fetch(summeryApi.searchproduct.url + query.search)

        const dataresponse = await response.json()

        setLoading(false)
        setData(dataresponse.data)

        console.log("dataresponse", dataresponse)
    }
    useEffect(() => {
        fetchproduct()
    }, [query])

    return (
        <div className='container mx-auto p-4'>
            {
                loading && (
                    <p className='text-lg text-center'>Loanding ...</p>
                )
            }

            <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
                )
            }

            {
                data.length !== 0 && !loading && (
                    <Verticalcard loading={loading} data={data}></Verticalcard>
                )
            }
        </div>
    )
}
