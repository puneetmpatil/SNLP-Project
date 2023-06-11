import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"
import SignInSchema from "../../schema/SignIn"
import axios from "axios"

function SignIn(props) {

    const navigate = useNavigate()
    useEffect(() => {
        document.title = props.title
    }, [])

    const handleSubmit = async (user) => {
        try {
            let data = await axios.post("http://localhost:8000/auth/login/", user)
            data = data.data
            // print(data)
            localStorage.setItem("token", data.token)
            if (data) {
                // alert("User created successfully")
                navigate("/")
            }
        }
        catch (err) {
            alert("Invalid credentials")
            console.log(err)
        }
    }

    return (
        <>
            <Formik initialValues={{ username: "", password: "" }}
                validationSchema={SignInSchema}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}>
                {(props) => (
                    <div className="flex min-h-screen md:min-h-[90vh] flex-1 flex-col justify-center items-center px-6 lg:px-8 bg-black text-white">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight uppercase">
                                Sign in to your account
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium leading-6">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <Field
                                            id="username"
                                            name="username"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <div className="flex items-center">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <Field
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div className="flex justify-center">
                                    <Link to="/signup">Don&apos;t have an account? <span className="underline">Sign up</span></Link>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md hover:bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:text-white border border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase tracking-widest"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>)}
            </Formik>
        </>
    )
}

export default SignIn