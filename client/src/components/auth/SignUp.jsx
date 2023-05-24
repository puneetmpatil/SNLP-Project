import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function SignUp(props) {
    const navigate = useNavigate()

    const [user, setUser] = useState({ "name": "", "email": "", "password": "", "cpassword": "" })
    useEffect(() => {
        document.title = props.title
    }, [])


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(user)
        try {
            const newUser = {"username":user.name,"email": user.email, "password": user.password }
            let data = await axios.post("http://127.0.0.1:8000/auth/register/", newUser)
            data = data.data
            // console.log(data)
            localStorage.setItem("token", data.token)
            if (data.success) {
                // alert("User created successfully")
                
                navigate("/")
            }
        }
        catch (err) {
            console.log(err)
            // alert("Error creating user")
        }
        
    }

    return (
        <>
            <div className="flex min-h-screen md:min-h-[90vh] flex-1 flex-col px-6 lg:px-8 pt-6 bg-black text-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight uppercase">
                        Sign up
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center">
                                <label htmlFor="password" className="block text-sm font-medium leading-6">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <label htmlFor="cpassword" className="block text-sm font-medium leading-6">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="cpassword"
                                    name="cpassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Link to="/signin">Have an account? <span className="underline">Sign in</span></Link>
                        </div>
                        <div>
                            <button onClick={(values => handleSubmit(values))}
                                type="submit"
                                className="flex w-full justify-center rounded-md hover:bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:text-white border border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase tracking-widest"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp