import { useLocation } from "react-router-dom"
import SheetHome from "../pages/SheetHome";
import SheetDetail from "../pages/SheetDetail";

const SheetLayout = () => {
    const location = useLocation();
    if (location.pathname === "/sheets") {
        return (
            <SheetHome />
        )
    } else {
        return (
            // TODO : Add layout with sidebar and outlet
            <SheetDetail />
        )
    }

}

export default SheetLayout