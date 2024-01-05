import { MetaData } from "../../components/CustomComponents";
import { useEffect,useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import LoadingScreen from "../../components/globals/LoadingScreen";
import { userDashboardDetails } from "../../../api";
export default function UserDashWidgets() {
  console.log("Fuck");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  let ratingsData = data?.ratings;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await userDashboardDetails();
        if (res.data) {
          setData(res.data);
          ratingsData = res.data.ratings;
          console.log(ratingsData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }
  return (
    <>
      <MetaData path="u/dashboard/widgets" />
      <DashboardNavbar />
      <div className="container">Hi nice to meet you</div>
    </>
  );
}
