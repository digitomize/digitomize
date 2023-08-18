import { requireAuth } from "../../utils"
import { userDashboardDetails } from "../../api";
import { useLoaderData } from "react-router-dom";
import SignoutButton from "./SignoutButton";

export async function loader ({ request }) {
    await requireAuth(request)
    try {
        const data = await userDashboardDetails()
        return data
    } catch(err) {
        console.error(err)
        return null
}
}

export default function UserDashboard() {
    const data = useLoaderData()
    console.log(data.data)
  return (
    <>
    <div>UserDashboard</div>
    <SignoutButton />
    </>

  )
}
