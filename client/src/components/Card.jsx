import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import Button from './Button';
// import "./css/Card.css";
import geeksforgeeks from '../assets/geeksforgeeks.svg';
import leetcode from '../assets/leetcode.svg';
import codingninjas from '../assets/codingninjas.png';
import codechef from '../assets/codechef.svg';
import codeforces from '../assets/codeforces.svg';
import CopyToClipboard from './CopyToClipboard';

const hostToSVGMap = {
	leetcode: leetcode,
	codingninjas: codingninjas,
	codeforces: codeforces,
	geeksforgeeks: geeksforgeeks,
	codechef: codechef,
	// Add other hosts and their corresponding SVG variables here
};

// get user timezone from the browser
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function Card({ contest }) {
	const { name, startTimeUnix, url, duration, host, vanity } = contest;

	// Convert the Unix timestamp to a datetime in the specified timezone
	const dateTimeInTimezone = moment.unix(startTimeUnix).tz(userTimezone);

	// Format the datetime as a string
	const startDate = dateTimeInTimezone.format('MMMM DD');
	const startTime = dateTimeInTimezone.format('h:mm A');

	const [remaningTime, setRemainingTime] = useState('loading...');
	useEffect(() => {
		const intervalId = setInterval(() => {
			setRemainingTime(updateTimer(startTimeUnix, duration));
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [startTimeUnix]);

	return (
		<div
			className="border-[#D1E5F4] border-2 hover:shadow-[8px_8px_0px_#D1E5F4] my-4 sm:w-96 min-h-[250px] p-6 rounded-xl bg-cardsColor flex flex-col hover:scale-[1.02] hover:bg-cardsHover m-1"
			key={vanity}>
			<div className="flex justify-between">
				<p
					id="startTime"
					className="text-card-text font-light leading-tight text-lg max-md:text-sm lowercase">
					{startDate} at
					<span className="ml-1 ">
						<Link
							to="https://www.timeanddate.com/"
							className="my-auto">
							{startTime}
						</Link>
					</span>
				</p>
				<img
					src={hostToSVGMap[host]}
					alt={host}
					width="13%"
				/>
			</div>
			<Link
				to={`/contests/${vanity}`}
				className="my-auto">
				<h2 className="text-3xl pb-8">{name}</h2>
			</Link>
			<div className="flex justify-between items-end">
				<div>
					<p className="text-card-text text-xs font-light leading-tight lowercase">
						Duration : {duration}min
					</p>
					<div className="text-card-text text-xs font-light leading-tight lowercase">
						{remaningTime}
					</div>
				</div>
				<div className="h-8 max-md:w-12 clip">
					<CopyToClipboard vanity={vanity} />
				</div>
				<Button url={url} />
			</div>
		</div>
	);
}

export default memo(Card);

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
					Starts in {days}d {hours}h {minutes}m
				</p>
			);
		}
		return (
			<p>
				Starts in {hours}h {minutes}m {seconds}s
			</p>
		);
	}
}

// const startTime = timerElement.dataset.startTime;
// const timerElementId = timerElement.id;
