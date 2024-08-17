import React, { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';

const Home = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [p, setP] = useState('');
  const [points, setPoints] = useState([]);

  const calculatePoints = () => {
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const pInt = parseInt(p);
    const calculatedPoints = [];
   
    if (4 * aInt ** 3 + 27 * bInt ** 2 === 0) {
      console.log("Elliptical curve Not Possible");
    } else {
      const result1 = Array.from({ length: pInt }, (_, x) => (x ** 3 + aInt * x + bInt) % pInt);
      const result2 = Array.from({ length: pInt }, (_, x) => (x ** 2) % pInt);
     
      for (let i = 0; i < result1.length; i++) {
        for (let j = 0; j < result2.length; j++) {
          if (result1[i] === result2[j]) {
            calculatedPoints.push([i, j]);
          }
        }
      }
    }

    setPoints(calculatedPoints);
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".main",
      { opacity: 0, y: -50, color: "#fff", scale: 0.5, rotation: -10 },
      {
        opacity: 1,
        y: 0,
        color: "#0033ff",
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "bounce.out",
        textShadow: "0px 0px 10px rgba(255, 204, 0, 0.8)",
        delay: 0.5,
      }
    );
    gsap.fromTo(
      ".description",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 1 }
    );
    gsap.to(buttonRef.current, {
      duration: 1,
      scale: 1.1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.fromTo(
      ".table-input",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.2, delay: 1.5 }
    );

    gsap.fromTo(
      ".result-text",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power2.out", delay: 2.5 }
    );
  }, []);

  return (
    <div className="hero flex flex-col md:flex-row md:flex-wrap items-center">
      <div className="content bg-white flex-grow px-5 w-full md:w-[50vw] min-h-screen ">
        <div className="sol_of_elliptical">
          <h2 className="text-2xl sm:text-5xl text-white text-center md:text-center main">Solution of Elliptical Curve</h2>
          <h2 className="text-2xl sm:text-4xl pb-2 text-center md:text-center description">
            For elliptic curve <span className="text-red-500">E(F<sub>p</sub>)</span>: Y<sup>2</sup> = X<sup>3</sup> + AX + B, <span className="text-green-500">p prime</span>
          </h2>

          <div className="pt-3">
            <table className="table-auto w-full text-base sm:text-xl ">
              <tbody>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-5 py-3 text-center font-bold sm:w-1/2">
                    Enter the coefficient of 'a':
                  </td>
                  <td className="px-3 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="a"
                      className="border rounded w-[80%] px-2 py-1"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                    />
                  </td>
                </tr>

                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-bold sm:w-1/2">
                    Enter the coefficient of 'b':
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="b"
                      className="border rounded w-[80%]  px-2 py-1"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                    />
                  </td>
                </tr>

                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-bold sm:w-1/2">
                    Enter the modulo 'p':
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="p"
                      className="border rounded w-[80%]  px-2 py-1"
                      value={p}
                      onChange={(e) => setP(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-center pt-5">
              <button
                ref={buttonRef}
                className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={calculatePoints}
              >
                Calculate
              </button>
            </div>
          </div>

          <div className="tab-head text-center pt-4 pb-6 text-4xl result-text">
            <h2>Points on Elliptical curve</h2>
          </div>

          <table id="pointsTable" className="table-auto bg-gray-800 text-white text-xl sm:w-1/2 text-center px-4 rounded-lg shadow-lg pb-4 result-text">
            <thead>
              <tr>
                <th className="px-4 py-2 text-align-center">x-Axis Point</th>
                <th className="px-4 py-2 text-align-center">Y-Axis Point</th>
              </tr>
            </thead>
            <tbody>
              {points.map((point, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{point[0]}</td>
                  <td className="px-4 py-2">{point[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
