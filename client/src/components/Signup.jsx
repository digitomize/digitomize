import { useNavigation, Form, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
// import { useUserAuth } from '../context/UserAuthContext';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useUserAuth } from '../context/UserAuthContext';



// export async function action({ request }) {
//     const formData = await request.formData()
//     const username = formData.get("username")
//     const firstName = formData.get("firstName")
//     const email = formData.get("email")
//     const password = formData.get("password")
//     console.log({ username, firstName, email, password })
//     try {
//         const data = await createUserWithEmailAndPassword(auth, email, password)
//         const user = data.user
//         updateProfile(user, {
//             displayName: username
//         })
//         auth.currentUser.getIdToken(true).then((idToken) => {
//             console.log(idToken);
//             const response = axios.post("http://localhost:4001/user/signup", {
//                 headers: {
//                     Authorization: `Bearer ${idToken}`,
//                 },
//             });
//         });
//         return redirect('/contests')
//     } catch (err) {
//         const errorMessage = err.message
//         return errorMessage
//     }


export default function Signup() {

    const navigation = useNavigation()
    const [firstName, setFirstName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { signUp } = useUserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password)
            const token = auth.currentUser.accessToken
            if (token) {
                axios.post("http://localhost:4001/user/signup", {
                    name : firstName,
                    username : username,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then(res => console.log(res))
                    .catch(err => setError(err.message))
            }
            navigate("/login")
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="outer-login-div">
            <div className="login-container">
                <h1 className='text-4xl'>Sign up your account</h1>
                {error && <h3 className="red">{error}</h3>}
                <Form
                    onSubmit={handleSubmit}
                    className="w-full h-full max-w-lg mt-8"
                    replace
                >
                    {/* new form  */}
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                First Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Username
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Doe" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-email">
                                Email
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="******************" />
                        </div>
                    </div>
                    <div className="md:flex md:items-center items-center">
                        <div className="md:w-2/3  ">
                            <button disabled={navigation.state === "submitting"} className="shadow bg-zinc-100 drop-shadow-2xl focus:shadow-outline focus:outline-none font-dark  py-2 px-12 text-slate-900 rounded">
                                {navigation.state === "submitting" ? "Signing up..." : "Sign up"}
                            </button>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    )
}
