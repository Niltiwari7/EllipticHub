import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const TorsionPoint = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [p, setP] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [result, setResult] = useState('');

  const ECC_point_addition = (P, Q, a, b, p) => {
    if (P[0] === -1 && P[1] === -1) {
      return Q;
    } else if (Q[0] === -1 && Q[1] === -1) {
      return P;
    } else {
      let num, den, s;
      if (P[0] === Q[0] && P[1] === Q[1]) {
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

  const find_torsion_order = (P, a, b, p) => {
    let R = P;
    let order = 1;
    while (!(R[0] === -1 && R[1] === -1)) {
      R = ECC_point_addition(R, P, a, b, p);
      order += 1;
      if (order > 1000) {
        return -1; 
      }
    }
    return order;
  };

  const handleCalculate = () => {
    const aInt = parseFloat(a);
    const bInt = parseFloat(b);
    const pInt = parseInt(p);
    const xFloat = parseFloat(x);
    const yFloat = parseFloat(y);

    if ((yFloat ** 2) % pInt === (xFloat ** 3 + aInt * xFloat + bInt) % pInt) {
      const resultValue = find_torsion_order([xFloat, yFloat], aInt, bInt, pInt);
      if (resultValue === -1) {
        setResult("No torsion point found within the iteration limit.");
      } else {
        setResult(`The torsion order of the point is: ${resultValue}`);
      }
    } else {
      setResult(`The provided points are not on the elliptic curve defined by y^2 = x^3 + ${a}x + ${b} mod ${p}.`);
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
        delay: 0.5,
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
      <div className="content bg-white flex-grow px-5 h-auto w-full md:w-[50vw]">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl text-gray-900 sm:main">Finding The Torsion Point</h2>
          <h3 className="text-xl sm:text-2xl text-gray-700 description">
            For elliptic curve <span className="text-red-500">E(F<sub>p</sub>)</span>: Y<sup>2</sup> = X<sup>3</sup> + AX + B, <span className="text-green-500">p prime</span>
          </h3>
        </div>
        <div className="pt-5">
          <table className="table-auto w-full text-base sm:text-lg">
            <tbody>
              <tr className="table-input">
                <td className="px-2 py-3 text-right font-bold">Enter the coefficient of 'a':</td>
                <td className="px-2 py-3">
                  <input
                    type="text"
                    id="a"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                    className="border rounded-lg w-full sm:w-[80%] px-2 py-1"
                  />
                </td>
              </tr>
              <tr className="table-input">
                <td className="px-2 py-3 text-right font-bold">Enter the coefficient of 'b':</td>
                <td className="px-2 py-3">
                  <input
                    type="text"
                    id="b"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    className="border rounded-lg w-full sm:w-[80%] px-2 py-1"
                  />
                </td>
              </tr>
              <tr className="table-input">
                <td className="px-2 py-3 text-right font-bold">Enter the modulo 'p':</td>
                <td className="px-2 py-3">
                  <input
                    type="text"
                    id="p"
                    value={p}
                    onChange={(e) => setP(e.target.value)}
                    className="border rounded-lg w-full sm:w-[80%] px-2 py-1"
                  />
                </td>
              </tr>
              <tr className="table-input">
                <td className="px-2 py-3 text-right font-bold">Enter the x-coordinate of Point P:</td>
                <td className="px-2 py-3">
                  <input
                    type="text"
                    id="x"
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    className="border rounded-lg w-full sm:w-[80%] px-2 py-1"
                  />
                </td>
              </tr>
              <tr className="table-input">
                <td className="px-2 py-3 text-right font-bold">Enter the y-coordinate of Point P:</td>
                <td className="px-2 py-3">
                  <input
                    type="text"
                    id="y"
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                    className="border rounded-lg w-full sm:w-[80%] px-2 py-1"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center py-5">
          <button
            ref={buttonRef}
            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCalculate}
          >
            Calculate
          </button>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-blue-500 text-center result-text">
          {result}
        </div>
      </div>
    </div>
  );
};

export default TorsionPoint;
