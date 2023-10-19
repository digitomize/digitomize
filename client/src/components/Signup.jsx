import {
    useNavigation,
    Form,
    useNavigate,
    redirect,
    Link
} from 'react-router-dom'

import axios from 'axios'

import {
    useState
} from 'react';

import {
    isLoggedIn
} from '../../api';

import {
    auth
} from '../../firebase';

import {
    useUserAuth
} from '../context/UserAuthContext';

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
import SignoutButton from "../user/components/SignoutButton"


export async function loader() {
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
        return redirect("/login")
    }
    return null;
}

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
                axios.post(`${backendUrl}/user/signup`, {
                    name: firstName,
                    username: username,
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
        <div className="flex items-center justify-center mt-24 mb-10 md:mt-0">
            <div className="flex flex-col overflow-hidden px-[27px] my-0 mx-auto font-outfit text-[1.5rem] justify-center items-center">
                <h1 className='text-4xl text-center'>Sign up your account</h1>
                {error && <h3 className="text-[#cc0000] text-center">{error}</h3>}
                <div className="flex w-full justify-center">
                    <Form
                        onSubmit={handleSubmit}
                        className="w-full h-full max-w-lg mt-8"
                        replace
                    >
                        {/* new form  */}
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-2">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-2">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Username
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Doe" required />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-2">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-email">
                                    Email
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-2">
                                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-password">
                                    Password
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="******************" required />
                            </div>
                        </div>
                        <div className="md:flex md:items-center items-center">
                            <div className="flex w-full justify-center">
                                <SignoutButton isDisabled={navigation.state === "submitting"} btnName={navigation.state === "submitting"
                                    ? "Signing up..."
                                    : "Sign up"}
                                    backgroundColor="bg-[#4285f4]"
                                />
                            </div>
                        </div>
                    </Form>
                </div>
                <p className="w-full text-center"> Already registered ? <Link to="/login" className="text-[#4285f4]">Login</Link></p>
            </div>
        </div>
    )
}
