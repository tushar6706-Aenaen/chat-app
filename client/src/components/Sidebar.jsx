import React from 'react'
import assets from '../assets/assets'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
    return (
        <div>
            <div className='pb-5'>
                <div className="flex justify-between items-center">
                    <img src={assets.logo} alt="logo" className='max-w-40' />
                    <div className=' relative py-2 group'>
                        <img src={assets.menu_icon} alt="logo" className='max-h-5 cursor-pointer' />
                        <div>
                            <p></p>
                            <hr />
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
