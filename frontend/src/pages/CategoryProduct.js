import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCategory from '../helper/productcategory'
import Verticalcard from '../component/Verticalcard'
import summeryApi from '../common'

export default function CategoryProduct() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortby, setSortby] = useState('')
 
  const location = useLocation()
  const URLSearch = new URLSearchParams(location.search)
  const urlcategorylistinArray = URLSearch.getAll("category")

  const urlcategoryListObject = {}
  urlcategorylistinArray.forEach(el=>{
    urlcategoryListObject[el] = true
  })
  // console.log("urlcategoryListObject", urlcategoryListObject)
  // console.log("urlcategorylistinArray", urlcategorylistinArray)

  const [selectcategory, setselectcategory] = useState(urlcategoryListObject)
  const [filterCategorylist, setfilterCategorylist] = useState([])

  const fetchdata = async () => {
    const response = await fetch(summeryApi.filterproduct.url,{
      method:summeryApi.filterproduct.method,
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify({
        category : filterCategorylist
      })
    })

    const dataresponse = await response.json()

    setData(dataresponse?.data || [])
  }
  // {
  //   params?.categoryName
  // }


  const handleSelectCategory = (e) => {
    const {name, value, checked} = e.target

    setselectcategory((prev)=>{
      return{
        ...prev,
        [value] : checked
      }
    })
    // console.log("handleSelectCategory", name,value,checked)
  }

  useEffect(()=>{
    fetchdata()
  },[filterCategorylist])

  useEffect(()=>{
    const arrayOfCategory = Object.keys(selectcategory).map(categoryKeyName => {
      if(selectcategory[categoryKeyName]){
          return categoryKeyName
      }
      return null
    }).filter(el => el)
    setfilterCategorylist(arrayOfCategory)
    // console.log("arrayOfCategory",arrayOfCategory)
  },[selectcategory])

  const handleOnchangeSortby = (e) => {
      const {value} = e.target
      setSortby(value)
      if(value === "asc"){
        setData(prev => prev.sort((a,b) => a.sellingprice - b.sellingprice))
      }
      if(value === "dcs"){
        setData(prev => prev.sort((a,b) => b.sellingprice - a.sellingprice))
      }
  }

  useEffect(()=>{
     
  },[sortby])

  return (
    <div className='container mx-auto px-4'>
      {/* desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* sort by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort By</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" id="" checked={sortby === "asc"} value={"asc"} onChange={handleOnchangeSortby}/>
                <label htmlFor="">Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type="radio" name="sortBy" id="" checked={sortby === "dcs"} value={"dcs"} onChange={handleOnchangeSortby}/>
                <label htmlFor="">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                ProductCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-3'>
                      <input type="checkbox" name={"category"} checked={selectcategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>

        </div>
        {/* right side (product) */}
        <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none pt-4'>
          {
            data.length !== 0 && !loading &&(
              <Verticalcard data={data} loading={loading}></Verticalcard>
            )
          }

        </div>
      </div>
    </div>
  )
}




