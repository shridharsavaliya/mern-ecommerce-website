import React, { useEffect, useState } from 'react'
import summeryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeuserRole from '../component/ChangeuserRole';

export default function Allusers() {

    const [alluser, setAlluser] = useState([])
    const [updateUser, setUpdateUser] = useState(false)
    const [updateuserDetail, setUpdateuserDetail] = useState({
        email: '',
        name: '',
        role: '',
        _id:''
    })

    const fetchAlluser = async (req,res) => {
        try {
            const dataResponse = await fetch(summeryApi.alluser.url, {
                method: summeryApi.alluser.method,
                credentials: "include",
            })

            const userdata = await dataResponse.json()

            if (userdata.success) {
                setAlluser(userdata.message)
            }
            if (userdata.error) {
                toast.error(userdata.message)
            }
            // console.log("alluser", userdata)

        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    useEffect(() => {
        fetchAlluser()
    }, [])

    return (
        <div className='bg-white pb-4'>
            <table className='w-full usertable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        alluser.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{moment(user.createdAt).format("ll")}</td>
                                    <td>
                                        <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' onClick={() => {setUpdateuserDetail(user); setUpdateUser(true) }}><MdModeEdit /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                updateUser && (
                    <ChangeuserRole onclose={() => setUpdateUser(false)}
                        name={updateuserDetail.name}
                    email = { updateuserDetail.email }
                    role = { updateuserDetail.role } 
                    userid = {updateuserDetail._id}
                    callFunc= {fetchAlluser}
                    />
                )
            }

        </div>
    )
}
