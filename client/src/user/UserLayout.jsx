import {
   Outlet
   } from "react-router-dom"

import { 
  requireAuth 
} from "../../utils"

export async function loader({ request }) {
  await requireAuth()
  return null;
} 

export default function UserLayout() {
  return (
    <>
    <Outlet />
    </>
  )
}
