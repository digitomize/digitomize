import { useOutletContext, useParams } from "react-router-dom";

function PlatformRatings() {
    const data = useOutletContext();
    const { platform } = useParams();
    console.log(platform);

    // Assuming that `data.ratings` contains the platform data
    const platformData = data.ratings[platform];

    // Check if platformData is available before rendering
    if (platformData) {
        return (
            <div>
                <h1>{platform} Ratings</h1>
                <p>Username: {platformData.username}</p>
                <p>Rating: {platformData.rating}</p>
                <p>Contests Attended: {platformData.attendedContestsCount}</p>
                <p>Badge: {platformData.badge}</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>No data available for the selected platform: {platform}</p>
            </div>
        );
    }
}

export default PlatformRatings;
