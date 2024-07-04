import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../Components/styles.css'
function ProfilePage() {
    const [user , setUser] = useState({
        name : "Kushagra",
        email : "abc@gmail.com",
        profilePicture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcoT50PqhleLXWfEEqMiwxuFE6dEMS3gPApw&s",
        address : {
            room : "5301",
            hostel : "BH-V",
            floor : 3
        }
    })

    // const fetchUser = async () => {
    //     try {
    //         const response = await axios.get('https://campuscart-backend.onrender.com/user/getProfile');
    //         console.log(response.data);
    //         setUser(response.data);
    //     } catch (error) {   
    //         console.log("Fetchuser error :: " , error);
    //     }
    // }

    // useEffect(() => {
    //     fetchUser()
    // } ,  [])

    
    const [name , setName] = useState(user.name);
    const [email , setEmail] = useState(user.email);
    const [profilePicture , setProfilePic] = useState(user.profilePicture);
    const [address, setAddress] = useState(user.address);
    const [nameEdit , setNameEdit] = useState(false);
    const [emailEdit , setEmailEdit] = useState(false)
    const [profilePicEdit , setProfilePicEdit] = useState(false);
    const [addressEdit , setAddressEdit] = useState(false);

    // useEffect(() => {
    //     const response = axios.post('https://campuscart-backend.onrender.com/user/updateProfile' , {name ,email , profilePicture })

    //     console.log(response);
        
    // } , [name , email , profilePicture , address])

    let orders = [{items : [{
        image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpiOm0dD7XYgKSxIHDqOD0mDcl43N1t-ZsaQ&s' , 
        name : "ABC",
        price : "100 INR"
    },{
        image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpiOm0dD7XYgKSxIHDqOD0mDcl43N1t-ZsaQ&s' , 
        name : "ABC",
        price : "100 INR"
    }
    ],
    payment : {
        amount : "220",
        payment_method : "COD",
        currency : "INR",
        status : "cancelled"
    },
    shipping : {
        address : {
            room : "5301",  
            floor : "3",
            hostel : "bh-5"
        }
    }
} , 
{items : [{
    image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpiOm0dD7XYgKSxIHDqOD0mDcl43N1t-ZsaQ&s' , 
    name : "ABC",
    price : "100 INR"
},{
    image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpiOm0dD7XYgKSxIHDqOD0mDcl43N1t-ZsaQ&s' , 
    name : "ABC",
    price : "100 INR"
}
],
payment : {
    amount : "220",
    payment_method : "COD",
    currency : "INR",
    status : "cancelled"
},
shipping : {
    address : {
        room : "5301",  
        floor : "3",
        hostel : "bh-5"
    }
}
}];
    if(!user){
        return (
            <div>User Details not found</div>
        )
    }


    
    return (
        <div className='outer-box'>
            <h1 className='heading1'>My ProfilePage</h1>
                <div className='data-box'>
                    <h2 >ProfilePage Picture</h2>
                    <div >
                        <img className='profilePicture' src='https://images.justwatch.com/poster/304428670/s332/season-2' alt="No profile Picture" />
                    </div>
                    
                </div>
            <div className='data-box'>
                <h2>Name</h2>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={!nameEdit}
                    />
                    <button
                        onClick={() => {
                            setNameEdit((prev) => !prev);
                        }}
                    >
                        {nameEdit ? "📁" : "✏️"}
                    </button>
                </div>
                
            </div>
            <div className='data-box'>
                <h2>Email</h2>
                <div>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={!emailEdit}
                    />
                    <button
                        onClick={() => {
                            setEmailEdit((prev) => !prev);
                        }}
                    >
                        {emailEdit ? "📁" : "✏️"}
                    </button>
                </div>
                
            </div>
            <div className='data-box'>
                <h2>Address</h2>
                <div className='address-fields'>
                    <div className='field'>
                        <h3>Room No.</h3>
                        <div>
                            <input
                                type="text"
                                value={address.room}
                                onChange={(e) => setAddress({...address , room : e.target.value})}
                                readOnly={!addressEdit}
                            />
                            <button
                                onClick={() => {
                                    setAddressEdit((prev) => !prev);
                                }}
                            >
                                {addressEdit ? "📁" : "✏️"}
                            </button>
                        </div>
                        
                    </div>
                    <div className='field'>
                        <h3>Hostel</h3>
                        <div>
                            <input
                                type="text"
                                value={address.hostel}
                                onChange={(e) => setAddress({...address , hostel : e.target.value})}
                                readOnly={!addressEdit}
                            />
                            <button
                                onClick={() => {
                                    setAddressEdit((prev) => !prev);
                                }}
                            >
                                {addressEdit ? "📁" : "✏️"}
                            </button>
                        </div>
                        
                    </div>
                    <div className='field'>
                        <h3>Floor</h3>
                        <div>
                            <input
                                type="text"
                                value={address.floor}
                                onChange={(e) => setAddress({...address , floor : e.target.value})}
                                readOnly={!addressEdit}
                            />
                            <button
                                onClick={() => {
                                    setAddressEdit((prev) => !prev);
                                }}
                            >
                                {addressEdit ? "📁" : "✏️"}
                            </button>
                        </div>
                        
                    </div>
                </div>
                
            </div>

            <div className="previous-orders">
                <h2 className='heading2'>Order History</h2>
                <div className="orders">
                    {orders.map((order) => {
                        let items = order.items;
                        return (
                            <div className="order">
                                <div className='order-status'>
                                    <div>
                                        <span className='heading3'>Order Amount</span>  {order.payment.amount} {order.payment.currency}
                                    </div>
                                    
                                    <div className='delivery-date'>
                                        <span className='heading3'>Order Placed</span> 24-01-2024
                                    </div>
                                    <div>
                                        <span className='heading3'>Ship To</span> 
                                        Room No. - {order.shipping.address.room} <br/>
                                        {order.shipping.address.floor} floor , 
                                        {order.shipping.address.hostel}
                                    </div>
                                    <div className="payment-method">
                                        <span className='heading3'>Mode of Payment</span>
                                        {order.payment.payment_method}
                                    </div>
                                </div>
                                <div className='products'>
                                    {items.map((item) => {
                                        return (
                                            <div className='product'>
                                                <div className='product-image'>
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <div className='product-details'>
                                                    <div className='product-name'>{item.name}</div>
                                                    <div className="product-price">{item.price}</div>
                                                </div>
                                                <div>
                                                    <div className={`${order.payment.status === "Confirmation awaited" ? "yellow" : order.payment.status === "cancelled" ? "red": "green"} order_state`}>
                                                       {order.payment.status}
                                                    </div>
                                                    {
                                                        order.payment.status !== "Confirmation awaited" && order.payment.status !== "cancelled"  ?
                                                            (<div className='delivery-date'>
                                                                Delivered on <br/> 
                                                                24-01-2005
                                                            </div>) : ""
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        )
                    })}
                </div>
                
            </div>


        </div>
    )
}

export default ProfilePage