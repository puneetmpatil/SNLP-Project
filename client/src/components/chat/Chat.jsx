import React from 'react'

function Chat(props) {
    const {chat} = props
    console.log(chat)
    return (
        <div className='flex flex-col text-sm font-serif'>
            <div className='flex justify-end'>
                <p className='p-3 bg-green-900 text-white'>{chat.request}</p>
            </div>
            <div className='flex justify-start'>
                <p className='p-3 text-white bg-gray-800'>{chat.response}</p>
            </div>
        </div>
    )
}

export default Chat