import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "../lib/utils";

import {
  uniqueNamesGenerator,
  adjectives,
  names,
} from "unique-names-generator";
import { AvatarGenerator } from "random-avatar-generator";

const TitleComponent = ({ title, avatar }) => (
  <div className="flex space-x-2 items-center">
    {avatar && (
      <img
        src={avatar}
        height="20"
        width="20"
        alt="thumbnail"
        className="rounded-full border-2 border-white"
      />
    )}
    <p>{title}</p>
  </div>
);

export const FollowerPointerCard = ({ children, className, user }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef(null);
  const [rect, setRect] = useState(null);
  const [isInside, setIsInside] = useState(false);

  const generator = new AvatarGenerator();
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, names],
    separator: " ",
    style: "capital",
  });

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (e) => {
    if (rect) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      x.set(e.clientX - rect.left + scrollX);
      y.set(e.clientY - rect.top + scrollY);
    }
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = () => {
    setIsInside(true);
  };

  const title = user ? (
    <TitleComponent title={user.displayName} avatar={user.photoURL} />
  ) : (
    <TitleComponent
      title={name}
      avatar={generator.generateRandomAvatar(name)}
    />
  );

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      style={{ cursor: "none" }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({ x, y, title }) => {
  const colors = [
    "var(--sky-500)",
    "var(--neutral-500)",
    "var(--teal-500)",
    "var(--green-500)",
    "var(--blue-500)",
    "var(--red-500)",
    "var(--yellow-500)",
  ];

  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 text-sky-500 transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-sky-600"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="px-2 py-2 bg-neutral-200 text-white whitespace-nowrap min-w-max text-xs rounded-full"
      >
        {title}
      </motion.div>
    </motion.div>
  );
};
