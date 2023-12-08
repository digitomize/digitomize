import React from "react";

const QuestionComponent = (props) => {
    const questionObject = props.question;
    return (
        <>
            <div className="absolute h-28 lg:w-1/2 md:w-1/2 phonesm:w-screen phonesm:left-0 bg-cardsColor rounded-lg border-white border-2 text-white ">
                <span className="relative phonesm:left-1 sm:left-2 sm:text-xs md:left-5 md:text-xs lg:left-5 lg:text-lg top-5 text-white">{questionObject.name}</span><br />
                <div className="relative flex justify-between phonesm:left-1 phonesm:top-7 sm:left-2 sm:top-7 sm:mr-4 lg:left-5 lg:top-7 lg:mr-10 md:top-7 md:left-5 md:mr-10 phonesm:mr-2">
                    <div className="phonesm:gap-1 sm:gap-1 md:gap-1 lg:gap-4 flex w-fit h-fit">
                        <span className={`border-white border-2 p-1 rounded-lg text-white md:text-xs sm:text-xs lg:text-lg phonesm:text-xs 
                        ${questionObject.difficulty === 'easy' ? 'bg-green-700' :
                                questionObject.difficulty === 'medium' ? 'bg-yellow-700' :
                                    questionObject.difficulty === 'hard' ? 'bg-red-700' : ''}`}>{questionObject.difficulty}</span>
                        {questionObject.topics.map((topic, index) => (
                            <span className="border-white border-2 p-1 rounded-lg bg-blue-900 text-white md:text-xs sm:text-xs lg:text-lg phonesm:text-xs">{topic}</span>
                        ))}
                    </div>
                    <div className="right-2 phonesm:gap-1 lg:gap-4 md:gap-1 sm:gap-1 flex w-fit h-fit">
                        <button className="border-white border-2 p-1 rounded-lg text-white hover:bg-light-font md:text-xs sm:text-xs lg:text-lg phonesm:text-xs">fetch</button>
                        <button className="border-white border-2 p-1 rounded-lg text-white hover:bg-light-font md:text-xs sm:text-xs lg:text-lg phonesm:text-xs">save for later</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuestionComponent;