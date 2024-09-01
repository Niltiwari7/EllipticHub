import React from 'react';

function About() {
  return (
    <main>
      <div className="flex flex-wrap  justify-center dark:bg-gray-800">
        {/* Card 1 */}
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5  ">
          <img className="w-32 h-32 rounded-full mx-auto" src="https://typeset-partner-institution.s3.amazonaws.com/author-images/kalyan-banerjee/c20a252b-4edf-4cb4-ac82-1df34506e811/author.jpg" alt="Profile picture" />
          <h2 className="text-center text-2xl font-semibold mt-3">Kalyan Banerjee</h2>
          <p className="text-center text-gray-600 mt-1">Associate Professor at VIT Chennai </p>
          <div className="flex justify-center mt-5">
            {/* <a href="#" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a> */}
            <a href="https://www.linkedin.com/in/kalyan-banerjee-4b01757b/?originalSubdomain=in" target='_blank' className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
            <a href="https://research.vit.ac.in/researcher/kalyan-banerjee" target='_blank' className="text-blue-500 hover:text-blue-700 mx-3">Research Profile</a>
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold ">ABOUT</h3>
            <p className="text-gray-600 mt-2">
            Hi, I am Kalyan Banerjee. I am an independent mathematician working in arithmetic algebraic geometry.  I am an Assistant Professor in Mathematics at Vellore Institute of Technology Chennai. I am also a member of the American Mathematical Society. Previously I was a postdoctoral fellow in HRI Allahabad, TIFR Mumbai, IISER Mohali, ISI Bangalore and  Institute of Mathematical Sciences, Chennai.  I have completed my PhD in 2014 from the University of Liverpool.  My Phd studies are focused on the study of algebraic cycles on smooth projective algebraic varieties.  Before arriving to Liverpool, I have done my master's in Mathematics from Indian Statistical Institute, Bangalore.  I completed my undergraduate studies in Mathematics from St. Xavier's College Kolkata.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        <img className="w-32 h-32 rounded-full mx-auto" src="https://images.pexels.com/photos/18647225/pexels-photo-18647225/free-photo-of-jasleen-kaur-photograph.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile picture" />

          <h2 className="text-center text-2xl font-semibold mt-3">Jasleen Kaur</h2>
          <p className="text-center text-gray-600 mt-1">B.Tech Student at VIT Chennai</p>
          <div className="flex justify-center mt-5">
           
            <a href="https://www.linkedin.com/in/jasleen-kaur-b9a682217/" target='_blank' className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
            <a href="https://github.com/jask89738 " target='_blank' className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">ABOUT</h3>
            <p className="text-gray-600 mt-2">
            I'm Jasleen Kaur, a dedicated student pursuing a B.Tech degree in Computer Science Engineering with a specialization in Cyber Physical Systems at VIT Chennai. I have recently completed a research internship that allowed me to delve into some fascinating domains, including Elliptic Curve Cryptography, Post Quantum Cryptography, and even Animal Husbandry.

          My research experiences have ignited a strong passion within me, particularly in the fields of Big Data Analytics and Cryptography. I'm deeply interested in furthering my studies and making valuable contributions to these areas through research.

          As a proactive learner, I am proud to be an active student member of the ACM (Association for Computing Machinery), which keeps me updated with the latest developments in the world of computer science. Additionally, I hold the prestigious title of Karate Black Belt Champion, which reflects my dedication and discipline both inside and outside of academia.

          I look forward to pursuing my academic and research journey, aiming to leverage my skills and knowledge to address critical challenges in the realms of Big Data Analytics and Cryptography.
             
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
          <img className="w-32 h-32 rounded-full mx-auto" src="https://images.pexels.com/photos/18647415/pexels-photo-18647415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile picture" />
          <h2 className="text-center text-2xl font-semibold mt-3">Nilesh Tiwari</h2>
          <p className="text-center text-gray-600 mt-1"> B.Tech Student at VIT Chennai</p>
          <div className="flex justify-center mt-5">
   
            <a href="https://www.linkedin.com/in/nilesh-tiwari-bbb685215/" target='_blank' className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
            <a href="https://github.com/Niltiwari7" target='_blank' className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
          </div>
          <div className="mt-5">
            <h3 className="text-xl font-semibold">ABOUT</h3>
            <p className="text-gray-600 mt-2">
            I'm Nilesh Tiwari, an enthusiastic and dedicated student pursuing a B.Tech degree in Computer Science Engineering with a specialization in Cyber-Physical Systems at VIT Chennai. Recently, I had the privilege of completing a research internship that offered me a deep dive into captivating domains, specifically Elliptic Curve Cryptography and Post Quantum Cryptography.

            Through these research experiences, I found my true passion ignited, particularly in the fields of Web Development and Cryptography. The intricate challenges and innovative solutions within these areas have inspired me greatly. My keen interest in problem-solving, coupled with the dynamic world of web development, has fueled my desire to explore the intersection of technology and creativity.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
