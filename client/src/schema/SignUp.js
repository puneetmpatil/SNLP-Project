import * as Yup from 'yup'

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Password must be minimum 8 characters").required("Required"),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Required"),
    name: Yup.string().required("Required"),
})

export default SignUpSchema