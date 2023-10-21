import React, { useEffect, useState } from 'react';
import NewNavbar from "../../components/NewNavbar";
import { leaderboardData } from "../../../api";

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await leaderboardData();
        setData(res.data.leaderboard);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <NewNavbar />
          <div className="w-11/12 mx-auto mt-4">
              <div className="heading text-center my-4">
                  <h1>
                  Leaderboard
                  </h1>
                      
              </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Username</th>
                <th>CodeChef</th>
                <th>LeetCode</th>
                <th>CodeForces</th>
                <th>Digitomize Rating</th>
                <th>Platform Rating</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {data &&
                data.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            {/* You can set the image source dynamically */}
                            <img src={row.picture} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{row.username}</div>
                          {/* You can display more user details here if needed */}
                        </div>
                      </div>
                    </td>
                    <td>{row.codechef}</td>
                    <td>{row.leetcode}</td>
                    <td>{row.codeforces}</td>
                    <td>{row.digitomize_rating}</td>
                    <td>{row.platform_rating}</td>
                  </tr>
                ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>Username</th>
                <th>CodeChef</th>
                <th>LeetCode</th>
                <th>CodeForces</th>
                <th>Digitomize Rating</th>
                <th>Platform Rating</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
