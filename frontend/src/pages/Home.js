import React from 'react'
import Categorylist from '../component/Categorylist'
import BannerProduct from '../component/BannerProduct'
import Horizontalcardproduct from '../component/Horizontalcardproduct'
import VerticalcardProduct from '../component/VerticalcardProduct'

export default function Home() {
  return (
    <div>
      <Categorylist></Categorylist>
      <BannerProduct></BannerProduct>

      <Horizontalcardproduct category={"airpodes"} heading={"Top's Airpodes"}></Horizontalcardproduct>
      <Horizontalcardproduct category={"earphones"} heading={"Popular's Earphones"}></Horizontalcardproduct>

      <VerticalcardProduct category={"mobile"} heading={"Mobile"}></VerticalcardProduct>
      <VerticalcardProduct category={"mouse"} heading={"Mouse"}></VerticalcardProduct>
      <VerticalcardProduct category={"TV"} heading={"Television"}></VerticalcardProduct>
      <VerticalcardProduct category={"camera"} heading={"Camera & Photography"}></VerticalcardProduct>
      <VerticalcardProduct category={"speakers"} heading={"Bluetooth Speaker"}></VerticalcardProduct>
      <VerticalcardProduct category={"refrigerator"} heading={"Refrigerator"}></VerticalcardProduct>
      <VerticalcardProduct category={"trimmers"} heading={"Trimmer"}></VerticalcardProduct>
      <VerticalcardProduct category={"watches"} heading={"Watches"}></VerticalcardProduct>
      <VerticalcardProduct category={"processor"} heading={"Processor"}></VerticalcardProduct>
    </div>
  )
}
