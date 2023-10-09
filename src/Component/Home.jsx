import React, { useState } from 'react';
import '../styles/Home.css';


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
   
    if (4 * aInt**3 + 27 * bInt**2 === 0) {
      console.log("Elliptical curve Not Possible"); // Fixed the console.log statement
    } else {
      const result1 = Array.from({ length: pInt }, (_, x) => (x**3 + aInt * x + bInt) % pInt);
      const result2 = Array.from({ length: pInt }, (_, x) => (x**2) % pInt);
     
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


  return (
    <div className="hero flex min-h-screen">
    
    <div className="content bg-slate-500 flex-grow p-5 md:p-10 h-auto w-full ">
        <div className="sol_of_elliptical">
          <h2 className="text-5xl px-1 text-white">Solution of Elliptical Curve</h2>
          <h2 className="text-4xl pt-2 pb-2">For elliptic curve <span className="text-red-500">E(F<sub>p</sub>)</span>: Y<sup>2</sup> = X<sup>3</sup> + AX + B, <span className="text-green-500">p prime</span></h2>


          <div className="a px-1 pt-5 text-xl flex gap-3">
            <div id="inputLabel">
              <label htmlFor="a">Enter the coefficient of 'a':</label>
            </div>
            <div id="input">
              <input
                type="number"
                id="a"
                className="border rounded px-2 py-1"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </div>
          </div>


          <div className="b px-1 pt-5 text-xl flex gap-3">
            <div id="inputLabel">
              <label htmlFor="b">Enter the coefficient of 'b':</label>
            </div>
            <div id="input">
              <input
                type="number"
                id="b"
                className="border rounded px-2 py-1"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </div>
          </div>


          <div className="c px-1 pt-5 text-xl flex gap-3">
            <div id="inputLabel">
              <label htmlFor="c">Enter the modulo 'p':</label>
            </div>
            <div id="input">
              <input
                type="number"
                id="c"
                className="border rounded px-2 py-1"
                value={p}
                onChange={(e) => setP(e.target.value)}
              />
            </div>
          </div>


          <div>
            <button
              type="button"
              id="calculateButton"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-xl mt-5 md:pt-5"
              onClick={calculatePoints}
            >
              Calculate
            </button>
          </div>
        </div>


        <div className="tab-head pt-4 pb-6 text-4xl">
          <h2>Points on Elliptical curve</h2>
        </div>


        <table
          id="pointsTable"
          className="table-auto bg-gray-800 text-white text-xl p-4 rounded-lg shadow-lg pb-4"
        >
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
  );
};


export default Home;



