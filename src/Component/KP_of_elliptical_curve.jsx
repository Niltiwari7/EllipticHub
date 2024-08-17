import React, { useState, useEffect, useRef } from 'react';

import gsap from 'gsap';

const KP_of_elliptical_curve = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [p, setP] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [k, setK] = useState('');
  const [result, setResult] = useState('');

  const ECC_point_addition = (P, Q, a, b, p) => {
    if (P[0] === -1 && P[1] === -1) {
      return Q;
    } else if (Q[0] === -1 && Q[1] === -1) {
      return P;
    } else {
      let num, den, s;
      if (P[0] === Q[0] && P[1] === Q[1]) {
        // Point doubling case
        if (P[1] === 0) {
          return [-1, -1];
        } else {
          num = (3 * P[0] ** 2 + a) % p;
          den = (2 * P[1]) % p;
        }
      } else {
        if (P[0] === Q[0]) {
          return [-1, -1];
        }
        num = (Q[1] - P[1]) % p;
        den = (Q[0] - P[0]) % p;
      }

      if (den < 0) {
        den += p;
      }

      const denInverse = modInverse(den, p);

      s = (num * denInverse) % p;

      let x_R = (s ** 2 - P[0] - Q[0]) % p;
      if (x_R < 0) {
        x_R += p;
      }

      let y_R = (s * (P[0] - x_R) - P[1]) % p;
      if (y_R < 0) {
        y_R += p;
      }

      return [x_R, y_R];
    }
  };

  const modInverse = (a, m) => {
    let m0 = m;
    let x0 = 0;
    let x1 = 1;

    if (m === 1) {
      return 0;
    }

    while (a > 1) {
      const q = Math.floor(a / m);
      let t = m;

      m = a % m;
      a = t;

      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }

    if (x1 < 0) {
      x1 += m0;
    }

    return x1;
  };

  const handleCalculate = () => {
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const pInt = parseInt(p);
    const xFloat = parseFloat(x);
    const yFloat = parseFloat(y);
    const kInt = parseInt(k);

    let resultPoint = [xFloat, yFloat];
    for (let i = 1; i < kInt; i++) {
      resultPoint = ECC_point_addition(resultPoint, [xFloat, yFloat], aInt, bInt, pInt);
    }

    if (resultPoint[0] === -1 && resultPoint[1] === -1) {
      setResult("Point at infinity: (-1, -1)");
    } else {
      setResult(`Result after ${kInt} additions: (${resultPoint[0]}, ${resultPoint[1]})`);
    }
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.to(buttonRef.current, {
      duration: 1,
      scale: 1.1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

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
        delay: 0.5
      }
    );

    gsap.fromTo(
      ".description",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 1 }
    );

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
      <div className="content bg-white flex-grow px-5 h-auto w-full md:w-[50vw] ">
        <div className="KP_of_the_elliptical_curve">
          <div className="text-2xl sm:text-5xl text-white text-center md:text-center main">Find K*P of the Elliptical Curve</div>
          <div className="w-full text-2xl sm:text-4xl pb-2 text-center md:text-center description pr-2">
            For elliptic curve <span className="text-red-500 whitespace-normal">E(F<sub>p</sub>)</span>: Y<sup>2</sup> = X<sup>3</sup>  + AX + B, <span className="text-green-500">p prime</span>
          </div>
          <div className="pt-3">
            <table className="table-auto w-full text-base sm:text-xl">
              <tbody>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 sm:py-3 text-center font-bold sm:w-1/2">
                    Enter the coefficient of 'a':
                  </td>
                  <td className="sm:px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="a"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      className="border rounded-lg w-[80%] px-2 py-1"
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="sm:px-2 py-3 text-center font-bold sm:w-1/2">
                    Enter the coefficient of 'b':
                  </td>
                  <td className="sm:px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="b"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      className="border rounded-lg w-[80%] sm:px-2 py-1"
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
                      value={p}
                      onChange={(e) => setP(e.target.value)}
                      className="border rounded-lg  w-[80%] px-2 py-1"
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-bold sm:w-1/2">
                    Enter the x-coordinate of Point P:
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="x"
                      value={x}
                      onChange={(e) => setX(e.target.value)}
                      className="border rounded-lg  w-[80%] px-2 py-1"
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-bold sm:w-1/2">
                    Enter the y-coordinate of Point P:
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="y"
                      value={y}
                      onChange={(e) => setY(e.target.value)}
                      className="border rounded-lg  w-[80%] px-2 py-1"
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-bold sm:w-1/2">
                    Enter the K value:
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="k"
                      value={k}
                      onChange={(e) => setK(e.target.value)}
                      className="border rounded-lg  w-[80%] px-2 py-1"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center pt-5">
            <button
              ref={buttonRef}
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCalculate}
            >
              Calculate
            </button>
          </div>
          <div
            id="resultContainer"
            className="pt-5 pb-5 text-2xl sm:text-3xl font-bold text-blue-500 text-center md:text-left result-text"
          >
            {result}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KP_of_elliptical_curve;
