import React, { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ContactUs(props) {
    const form = useRef()
    useEffect(() => {
        document.title = props.title
    }, [])

    const [message, setMessage] = useState({ name: "", email: "", msg: "", })
    const [warnings, setWarnings] = useState({ emailMessage: "", nameMessage: "", textareaMessage: "" })

    const handleChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let emailMessage = "", nameMessage = "", textareaMessage = ""
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        let errors = false;

        if (!message.email) {
            emailMessage = "Please enter an email"
            errors = true;
        }
        else if (!regex.test(message.email)) {
            emailMessage = "Please enter a valid email";
            errors = true;
        }

        if (!message.name) {
            nameMessage = "Please enter a name";
            errors = true;
        }
        if (!message.msg) {
            textareaMessage = "Please enter a message";
            errors = true;
        }


        if (errors) {
            setWarnings({ emailMessage: emailMessage, nameMessage: nameMessage, textareaMessage: textareaMessage })
            setTimeout(() => {
                setWarnings({ emailMessage: "", nameMessage: "", textareaMessage: "" })
            }, 3000);
        }
        else {
            const YOUR_SERVICE_ID = "service_nuxa57i"
            const YOUR_TEMPLATE_ID = "template_0knfxpo"
            const YOUR_PUBLIC_KEY = "B1WztQkPBOyAOk7ef"
            emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, YOUR_PUBLIC_KEY)
                .then((result) => {
                    console.log(result.text);
                    toast.success('Message sent successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }, (error) => {
                    console.log(error.text);
                    toast.error("Message failed to send. Retry after some time", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });;
                });

            setTimeout(() => {
                setMessage({ name: "", email: "", msg: "" })

            }, 3000);
        }
    }
    return (
        <div className='bg-black md:min-h-[90vh] font-serif'>
            <div className="container py-24 px-6 mx-auto">
                <section className="mb-32 text-gray-800">
                    <div className="flex flex-wrap">
                        <div className="grow-0 shrink-0 basis-auto mb-6 md:mb-0 w-full md:w-1/2 px-3 lg:px-6">
                            <h2 className="text-3xl font-bold mb-6">Get in Touch with Us Today!</h2>
                            <p className="text-gray-500 mb-6">
                                At TaskTopia, we value the feedback and inquiries of our customers and potential customers. Whether you have a question, a concern, or just want to say hello, we are here to help. Our dedicated team of professionals is always ready to assist you with any inquiries or concerns you may have. We understand that reaching out for help can sometimes be overwhelming, which is why we've made it as simple as possible for you to get in touch with us.
                            </p>
                            <p className="text-gray-500 mb-6">
                                All you have to do is fill out the form below and one of our representatives will respond to you as soon as possible. So, what are you waiting for? Get in touch with us today and let us know how we can help. Whether you need assistance with a product or service, or just want to provide feedback, we would love to hear from you.
                            </p>
                        </div>
                        <div className="grow-0 shrink-0 basis-auto mb-12 md:mb-0 w-full md:w-2/5 px-3 lg:px-6">
                            <form ref={form}>
                                <div className="form-group mb-6">
                                    <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="name" placeholder="Name" name="name" onChange={handleChange} value={message.name} />
                                    <p className="text-red-500 text-sm h-3">{warnings.nameMessage}</p>
                                </div>
                                <div className="form-group my-6">
                                    <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="address" placeholder="Email address" name="email" onChange={handleChange} value={message.email} />
                                    <p className="text-red-500 text-sm h-3">{warnings.emailMessage}</p>
                                </div>

                                <div className="form-group my-6">
                                    <textarea className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="msg" rows={3} placeholder="Message" name="msg" onChange={handleChange} value={message.msg} />
                                    <p className="text-red-500 mb-3 text-sm h-3">{warnings.textareaMessage}</p>
                                </div>
                                <button type="submit" className=" w-full px-6 mt-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={handleSubmit}>Send</button>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light"
                                />
                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default ContactUs