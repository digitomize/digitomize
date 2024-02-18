import React from "react";
import NewNavbar from "@components/NewNavbar";
import SheetCard from "../components/SheetCard";
import QuestionComponent from "../components/QuestionComponent";
const sheet = [
  {
    name: "Striver's SDE Sheet",
    link: "#",
  },
  {
    name: "Love Babbar's 450 Sheet",
    link: "#",
  },
  {
    name: "Love Babbar's 300 Sheet",
    link: "#",
  },
  {
    name: "Fraz SDE Sheet",
    link: "#",
  },
  {
    name: "DSA Cracker Sheet",
    link: "#",
  },
];

const SheetHome = () => {
  return (
    <main className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 min-h-screen">
      <div className="pb-8">
        <NewNavbar />
      </div>
      <section className="pt-4 antialiased">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl text-[#F0ECE5]  normal-case font-extrabold tracking-wide">
            DSA Coding Sheets
          </h2>
          <p className="sm:text-xl leading-relaxed text-muted-foreground sm:w-3/4 tracking-tight normal-case ">
            Coding Sheets are a wonderful resource to proactively practice your
            DSA skills.
            <br /> Digitomize bring to you the{" "}
            <span className="text-custom-blue">
              most popular DSA sheets
            </span>{" "}
            availaible on the internet and provide you with tools like auto
            question fetching to keep track of your solved questions.
          </p>
        </div>
        <div className="pt-12">
          <h2 className="text-4xl text-gradient normal-case font-extrabold tracking-wide">
            Explore sheets :
          </h2>
        </div>
        <div className="pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sheet.map((sheet) => (
              <div key={sheet.name}>
                <SheetCard name={sheet.name} link={sheet.link} />
              </div>
            ))}
          </div>
          <QuestionComponent />
        </div>
      </section>
    </main>
  );
};

export default SheetHome;
