import React from "react"

const SubjectsOffered = () => {
  return (
    <>
      {/*  Second Column */}
      <div className="flex w-full flex-3 flex-col gap-y-7">
        <div className="flex w-full flex-col border">
          <h1 className="w-full border-b pt-5 pr-5 text-center font-chillax text-5xl text-[5em] font-semibold uppercase">
            Sub
            <span className="bg-[#ffbb00]/60 dark:text-background">
              jects {" "}
            </span>
            offered
          </h1>
        </div>
        <p className="px-15 tracking-wider max-md:px-2">
          At The Future Academy, we are focused on building a learning
          environment that truly supports students in reaching their full
          academic potential. Every part of our platform is designed to help you
          move forward with clarity, confidence, and purpose.
        </p>
        <p className="px-15 tracking-wider max-md:px-2">
          Through consistency, structured guidance, and a commitment to your
          progress, we help you stay disciplined and in control of your studies.
          With the right support system behind you, improving your results
          becomes a process you can trust and follow.
        </p>
      </div>
      {/*  Third Column */}
      <div className="w-full flex-1"></div>
    </>
  )
}

export default SubjectsOffered
