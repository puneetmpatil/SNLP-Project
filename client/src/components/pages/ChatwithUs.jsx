import React, { useEffect, useState } from 'react'
import Chat from '../chat/Chat'
import axios from 'axios'

function ChatwithUs() {
    const [chats, setChats] = useState([]);
    const [prompt, setPrompt] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            request: prompt
        }

        try {
            const res = await axios.post('http://127.0.0.1:8000/chats/post/', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }

    }

    const deleteChats = async (e) => {
        e.preventDefault()
        
        // Put Modal inorder to confirm the deletion
        confirm = confirm('Are you sure you want to delete all chats?')
        if(!confirm){
            return
        }

        try {
            const res = await axios.delete('http://127.0.0.1:8000/chats/delete', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
            console.log(res.data)
        }
        catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        document.title = "Chat With Us"
        getChat()
    }, [handleSubmit, deleteChats])

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
    const onChange = (e) => {
        setPrompt(e.target.value)
    }



    return (
        <section className='bg-black text-white min-h-[90vh] font-serif'>
            <div className='w-4/5 mx-auto py-16 md:w-2/3'>
                <h2 className='text-3xl text-center font-extrabold tracking-wider mb-8 uppercase'>Chat with Us</h2>
                <p className='text-sm tracking-wider py-4'>We are here to help you. You can chat with us and ask your queries.</p>
                <section className='bg-gray-300 min-h-[60vh] text-black'>
                    {chats.length != 0 ? chats.map((chat, id) => (
                        <Chat key={id} chat={chat} />
                    )) : <div className='text-center text-2xl flex items-center justify-center h-[60vh]'>No chats to display</div>}
                </section>
                <form>
                    <div className='bg-gray-800 flex items-center gap-x-1'>
                        <input className='w-[95%] p-2 rounded-sm bg-gray-800 focus:outline-0' placeholder='Ask your query' name="request" onChange={onChange} id="request" />
                        <button onClick={handleSubmit} type='submit' id="submit" className=''>
                            <svg className="cursor-pointer h-4 w-4 mr-3" stroke="currentColor" fill="black" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </form>
                <div className='mx-auto w-fit mt-8'>
                    <button className='px-2 py-3 uppercase hover:scale-110 border-red-500 border rounded-xl hover:bg-red-500 hover:border-red-500 font-sans' onClick={deleteChats}>Delete Chats</button>
                </div>
            </div>

        </section>
    )
}

export default ChatwithUs