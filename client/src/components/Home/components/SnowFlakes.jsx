import { useState } from "react";
import snowFlakesImages from "../../../assets/snowflake.svg";

export default function SnowFlakes({ onClick, position }) {
    const snowflakeStyle = {
        position: "absolute",
        width: "80px",
        height: "80px",
        backgroundImage: `url(${snowFlakesImages})`,
        backgroundSize: "cover",
    };

    if (position === "top-left") {
        snowflakeStyle.left = "100px";
        snowflakeStyle.top = "50px";
    } else if (position === "bottom-right") {
        snowflakeStyle.right = "100px";
        snowflakeStyle.bottom = "0";
    }

    return <div className="snowflakes" style={snowflakeStyle} onClick={onClick}></div>;
}