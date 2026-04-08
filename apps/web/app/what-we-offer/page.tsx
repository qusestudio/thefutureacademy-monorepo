import React from "react"

const WhatWeOffer = () => {

  return (
    <main>
      <section className="flex w-full max-w-6xl flex-col gap-x-3 py-20 font-archivo max-md:pt-5">
        <p
          className={
            "mb-4 self-start border-b border-foreground pb-1 text-3xl max-md:text-2xl"
          }
        >
          Supported subjects
        </p>
        <article className="w-full max-w-6xl space-y-1 py-2">
          <p className={"text-2xl font-medium max-md:text-lg"}>Mathematics</p>
          <p>
            Mathematics builds the foundation for problem-solving, logical
            thinking, and analytical skills that are essential in almost every
            career. Mastering Maths opens doors to fields like engineering,
            finance, data science, architecture, and technology. With strong
            mathematical skills, students gain the ability to think
            critically, approach challenges with confidence, and unlock some
            of the most in-demand career opportunities in the world.
          </p>
        </article>
        <article className="w-full max-w-6xl space-y-1 py-2">
          <p className="text-2xl font-medium max-md:text-lg">Physics</p>
          <p>
            Physics helps students understand how the world works—from motion
            and energy to forces and matter. It develops deep analytical and
            reasoning skills that are highly valued in technical and
            scientific careers. Studying Physics can lead to pathways in
            engineering, aviation, research, robotics, and even space
            sciences, giving students the tools to innovate and solve
            real-world problems.
          </p>
        </article>
        <article className="w-full max-w-6xl space-y-1 py-2">
          <p className="text-2xl font-medium max-md:text-lg">Chemistry</p>
          <p>
            Chemistry explores the building blocks of matter and how
            substances interact and transform. It is essential for
            understanding everything from medicines to materials and
            environmental processes. This subject opens pathways into careers
            such as medicine, pharmacy, chemical engineering, biochemistry,
            and environmental science, making it a powerful subject for
            students interested in science and healthcare.
          </p>
        </article>

        <article className="w-full max-w-6xl space-y-1 py-2">
          <p className="text-2xl font-medium max-md:text-lg">Accounting</p>
          <p>
            Accounting teaches students how to manage, record, and interpret
            financial information—an essential skill in both business and
            everyday life. It builds a strong foundation in financial
            literacy, critical thinking, and decision-making. This subject
            leads to career opportunities in accounting, auditing, business
            management, finance, and entrepreneurship, empowering students to
            understand and control financial success.
          </p>
        </article>
      </section>
    </main>
  )
}

export default WhatWeOffer
