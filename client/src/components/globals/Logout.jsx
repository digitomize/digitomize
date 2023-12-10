import { useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { auth } from "../../../firebase"

import { toast } from "react-toastify"

export default function Logout() {
  const navigate = useNavigate()
  async function handleLogout() {
    await auth.signOut()
    toast.success("Logged out successfully")
    navigate("/login?message=Logged out successfully")
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return <div>Logging out...</div>
}
