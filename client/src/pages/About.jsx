export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            About القادری بلاگ
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to <span className="font-semibold">القادری بلاگ</span>! 
              This blog was created by <span className="font-semibold">Mohd Noman Qadri</span>, 
              a <span className="font-semibold">MERN Developer and Freelancer</span>, to share knowledge, 
              insights, and experiences in the world of technology and beyond.
            </p>

            <p>
              On <span className="font-semibold">القادری بلاگ</span>, you’ll find weekly articles and tutorials covering a range of topics, including:
            </p>

            <ul className="text-left list-disc list-inside">
              <li>
                📌 <span className="font-semibold">Web & App Development</span> – Best practices, frameworks, and real-world coding tips.
              </li>
              <li>
                🤖 <span className="font-semibold">Artificial Intelligence</span> – Exploring AI trends, machine learning, and automation.
              </li>
              <li>
                🕌 <span className="font-semibold">Islamic Blog</span> – Thoughtful reflections, history, and discussions on Islamic teachings.
              </li>
            </ul>

            <p>
              I am always learning and exploring new technologies, so be sure to check back often for fresh content!
            </p>

            <p>
              💬 <span className="font-semibold">Join the Conversation!</span> Engage with other readers by leaving comments, liking discussions, and sharing your thoughts. 
              I believe in the power of a <span className="font-semibold">learning community</span>, where knowledge grows through collaboration.
            </p>

            <p className="font-semibold text-lg">
              🚀 Let’s learn, build, and grow together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
