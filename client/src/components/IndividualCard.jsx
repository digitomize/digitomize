import { useState, useEffect, memo } from 'react';
import { Link, useParams } from 'react-router-dom';

import './css/IndividualCard.css';

import geeksforgeeks from '../assets/geeksforgeeks.svg';
import leetcode from '../assets/leetcode.svg';
import codingninjas from '../assets/codingninjas.png';
import codechef from '../assets/codechef.svg';
import codeforces from '../assets/codeforces.svg';
import Navbar from './Navbar';
import CopyToClipboard from './CopyToClipboard';
import moment from 'moment-timezone';

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

function IndividualCard() {
	const hostToSVGMap = {
		leetcode: leetcode,
		codingninjas: codingninjas,
		codeforces: codeforces,
		geeksforgeeks: geeksforgeeks,
		codechef: codechef,
		// Add other hosts and their corresponding SVG variables here
	};

	const params = useParams();
	const [contest, setContest] = useState(null);
	const vanity = params.vanity;

	useEffect(() => {
		fetch(`${backendUrl}/contests?vanity=${vanity}`)
			.then((res) => res.json())
			.then((data) => setContest(data.results[0]))
			.catch((error) => console.error('Error fetching contest:', error));
	}, [vanity]);
	const [remaningTime, setRemainingTime] = useState('loading...');
	if (contest === null) {
		return <div>Loading...</div>;
	}

	const { host, name, url, startTimeUnix, duration } = contest;

	// get user timezone from the browser
	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	// Convert the Unix timestamp to a datetime in the specified timezone
	const dateTimeInTimezone = moment.unix(startTimeUnix).tz(userTimezone);

	// Format the datetime as a string
	const startDate = dateTimeInTimezone.format('MMMM DD');
	const startTime = dateTimeInTimezone.format('h:mm A');

	setInterval(() => {
		setRemainingTime(updateTimer(startTimeUnix, duration));
	}, 1000);
	return (
		<>
			<div
				className="ic"
				key={vanity}>
				<div className="ic-child">
					<div className="ic-top">
						<p
							id="startTime"
							className="lowercase">
							{startDate} at
							<span>
								<Link
									to="https://www.timeanddate.com/"
									className="ml-1 my-auto">
									{startTime}
								</Link>
							</span>
						</p>
						<img
							src={hostToSVGMap[host]}
							alt={host}
							style={{ maxHeight: '50px', maxWidth: '50px' }}
						/>
					</div>

					<h2 id="contest-title">{name}</h2>

					<div className="ic-lower-button">
						<div className="ic-inner-lower">
							<p>Duration : {duration}min</p>
							<div>{remaningTime}</div>
						</div>

						<div className="flex flex-col-reverse">
							<div className="btn-div">
								<a
									href={url}
									target="_blank"
									rel="noopener noreferrer">
									<button>
										Participate
										{/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="55"
                      height="20"
                      viewBox="0 0 45 23"
                      fill="none">
                      <path d="M44.5402 13.0967C45.1372 12.5204 45.1556 11.5708 44.5812 10.9758L35.2213 1.27994C34.6469 0.684948 33.6973 0.669852 33.1002 1.24622C32.5032 1.82258 32.4848 2.77215 33.0591 3.36714L41.3791 11.9857L32.7306 20.3345C32.1336 20.9109 32.1152 21.8605 32.6896 22.4554C33.264 23.0504 34.2136 23.0655 34.8106 22.4892L44.5402 13.0967ZM0.720964 12.8395L43.4711 13.5191L43.5292 10.5197L0.779036 9.84009L0.720964 12.8395Z" fill="white" />
                    </svg> */}
									</button>
								</a>
							</div>
							<CopyToClipboard
								msg="share"
								vanity={vanity}
								gradient={'btn-div'}
							/>
						</div>
						{/* <Button  url={url}/> */}
					</div>
				</div>
			</div>
			<div className="containerBottom">
				<br />
			</div>
		</>
	);
}

export default IndividualCard;

function updateTimer(startTime, duration) {
	const currentTime = Math.floor(Date.now() / 1000);
	// const currentTime = getCurrentTimeIST();
	const timeDiff = startTime - currentTime;
	if (duration * 60 + startTime < currentTime) {
		return <p>the contest has ended</p>;
	} else if (startTime <= currentTime) {
		return <p>the contest has started!</p>;
	} else {
		const days = Math.floor(timeDiff / 86400);
		const hours = Math.floor((timeDiff % 86400) / 3600);
		const minutes = Math.floor((timeDiff % 3600) / 60);
		const seconds = timeDiff % 60;
		if (days > 0) {
			return (
				<p>
					Time Left : {days}d {hours}h {minutes}m {seconds}s
				</p>
			);
		}
		return (
			<p>
				Time Left : {hours}h {minutes}m {seconds}s
			</p>
		);
	}
}
