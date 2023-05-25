import React, { useEffect, useState } from 'react'
import Chat from '../chat/Chat'
import axios from 'axios'

function ChatwithUs() {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        document.title = "Chat With Us"
        getChat()
    }, [])

    const getChat = async () => {
        try {
            const data = await axios.get('http://localhost:8000/chats/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            })
            setChats(data.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <section className='bg-black text-white min-h-[90vh] font-serif'>
            <div className='w-4/5 mx-auto py-16 md:w-2/3'>
                <h2 className='text-3xl text-center font-extrabold tracking-wider mb-8 uppercase'>Chat with Us</h2>
                <p className='text-sm tracking-wider py-4'>We are here to help you. You can chat with us and ask your queries.</p>
                <section className='bg-gray-300 min-h-[60vh] text-black'>
                    {chats.length != 0 ? chats.map((chat,id) => (
                        <Chat key={id} chat={chat} />
                    )) : <div className='text-center text-2xl'>No chats</div>}
                </section>
            </div>

        </section>
    )
}

export default ChatwithUs