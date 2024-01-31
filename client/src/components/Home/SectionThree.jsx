import { Link } from "react-router-dom";
import ContestCards from "../ContestCards";
import { motion } from "framer-motion";
import { MdManageSearch } from "react-icons/md";
export default function SectionThree() {
  return (
    <div className="font-['Geist'] md:mt-4 pb-12">
      <div className="hero flex flex-col">
        <div className="">
          <div className="md:my-24 mx-auto w-4/5">
            <motion.h1
              initial={{ opacity: 0, x: -150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "tween",
                stiffness: 110,
                delay: 0,
              }}
              className="text-white max-md:text-4xl md:text-7xl text-center"
            >
              <span className="block mt-1 md:mt-6">
                <span className="bg-digitomize-bg px-2">Discover</span> the
                perfect coding competition for you
              </span>{" "}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 110,
                delay: 0.1,
              }}
              className="max-md:text-sm text-center mt-8 text-description max-w-2xl mx-auto"
            >
              filter contests based on various criteria and view contest details
              such as remaining time, duration, and more.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 110,
                delay: 0.2,
              }}
              className="flex justify-center m-8"
            >
             <a

href="/contests"

className="btn px-5 py-2 bg-button-primary border-button-primary-helper hover:bg-button-primary-hover text-lg text-white font-medium duration-75 rounded-2xl border"
>
<div  className='flex justify-center items-center gap-1'>
Explore Contests
<MdManageSearch />
</div>

</a>
            </motion.div>
          </div>
          <div className="w-screen">
            <ContestCards />
          </div>
        </div>
      </div>
    </div>
  );
}
