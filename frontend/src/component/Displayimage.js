import React from 'react'
import { SlClose } from 'react-icons/sl'

export default function Displayimage({ imgurl, onclose }) {

    return (
        <div className='fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onclose}>
                        <SlClose />
                    </div>
            <div className='felx justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgurl} className='w-full h-full' />
            </div>
            </div>
            
        </div>
    )
}
