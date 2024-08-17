import React, { useState, useEffect, useRef } from 'react';
import '../styles/AdditionOfTwoPoint.css';
import gsap from 'gsap';

const AdditionOfTwoPoint = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [p, setP] = useState('');
  const [x1, setX1] = useState('');
  const [y1, setY1] = useState('');
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');
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

  const handleCalculate = () => {
    // Parse inputs as integers or floats
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const pInt = parseInt(p);
    const x1Float = parseFloat(x1);
    const y1Float = parseFloat(y1);
    const x2Float = parseFloat(x2);
    const y2Float = parseFloat(y2);

    // Validate inputs
    if (isNaN(aInt) || isNaN(bInt) || isNaN(pInt) || isNaN(x1Float) || isNaN(y1Float) || isNaN(x2Float) || isNaN(y2Float)) {
      setResult("Please enter valid numeric values for all fields.");
      return;
    }

    const isPoint1Valid = (y1Float ** 2) % pInt === (x1Float ** 3 + aInt * x1Float + bInt) % pInt;
    const isPoint2Valid = (y2Float ** 2) % pInt === (x2Float ** 3 + aInt * x2Float + bInt) % pInt;

    if (isPoint1Valid && isPoint2Valid) {
      const resultPoint = ECC_point_addition([x1Float, y1Float], [x2Float, y2Float], aInt, bInt, pInt);

      if (resultPoint[0] === -1 && resultPoint[1] === -1) {
        setResult("Addition of the two points results in the point at infinity: (-1, -1)");
      } else {
        setResult(`Addition of the two points on the elliptic curve: (${resultPoint[0]}, ${resultPoint[1]})`);
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
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">
        <div className="AdditionOfTwoPoint">
          <div className="text-2xl sm:text-5xl text-white text-center md:text-center main">
            Addition of Two Points on Elliptical Curve
          </div>
          <div className="text-2xl sm:text-4xl  pb-2 text-center md:text-center description">
            For an elliptic curve
            <span className="text-red-500 px-3">E(F<sub>p</sub>)</span>:
            Y<sup>2</sup> = X<sup>3</sup> + AX + B,
            <span className="text-green-500">p prime</span>
          </div>

          <div className="pt-3">
            <table className="table-auto w-full text-base sm:text-xl ">
              <tbody>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-serif font-bold sm:w-1/2 ">
                    Enter the coefficient of 'a':
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="a"
                      className="border rounded   px-2 py-1 w-[80%]"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input ">
                  <td className="px-2 py-3 text-center font-serif font-bold sm:w-1/2">
                    Enter the coefficient of 'b':
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="b"
                      className="border rounded px-2 py-1 w-[80%]"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-serif font-bold sm:w-1/2">
                    Enter the modulo 'p':
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="text"
                      id="c"
                      className="border rounded px-2 py-1 w-[80%]"
                      value={p}
                      onChange={(e) => setP(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-serif font-bold sm:w-1/2">
                    Enter the x-coordinate of Point P:
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="number"
                      id="x"
                      className="border rounded px-2 py-1 w-[80%]"
                      value={x1}
                      onChange={(e) => setX1(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-serif font-bold sm:w-1/2">
                    Enter the y-coordinate of Point P:
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="number"
                      id="y"
                      className="border rounded px-2 py-1 w-[80%]"
                      value={y1}
                      onChange={(e) => setY1(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-serif font-bold sm:w-1/2">
                    Enter the x-coordinate of Point Q:
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="number"
                      id="qx"
                      className="border rounded px-2 py-1 w-[80%]"
                      value={x2}
                      onChange={(e) => setX2(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:flex-row table-input">
                  <td className="px-2 py-3 text-center font-serif font-bold sm:w-1/2">
                    Enter the y-coordinate of Point Q:
                  </td>
                  <td className="px-4 py-2 sm:w-1/2">
                    <input
                      type="number"
                      id="qy"
                      className="border rounded px-2 py-1 w-[80%]"
                      value={y2}
                      onChange={(e) => setY2(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-center pt-5">
            <button
              ref={buttonRef}
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
              onClick={handleCalculate}
            >
              Calculate
            </button>
          </div>

          <div className="pt-5 pb-5 text-2xl sm:text-3xl font-bold text-yellow-500 text-center md:text-left result-text main">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionOfTwoPoint;
