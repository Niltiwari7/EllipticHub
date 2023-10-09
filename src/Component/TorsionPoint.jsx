import React, { useState } from 'react';

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
          num = (3 * P[0]**2 + a) % p;
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

      let x_R = (s**2 - P[0] - Q[0]) % p;
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

  function find_torsion_order(P, a, b, p) {
    let R = P;
    let order = 1;
    while (!(R[0] === -1 && R[1] === -1)) {
        R = ECC_point_addition(R, P, a, b, p);
        order += 1;
        if (order > 1000) {
            return -1;  // Indicates that no torsion point was found within the iteration limit
        }
    }
    return order;
}

  const handleCalculate = () => {
    // Retrieve input values as integers or floats
    const aInt = parseFloat(a);
    const bInt = parseFloat(b);
    const pInt = parseFloat(p);
    const xFloat = parseFloat(x);
    const yFloat = parseFloat(y);

    // Perform validation checks here if needed

    // Calculate Torsion Point
    if ((yFloat ** 2) % pInt === (xFloat ** 3 + aInt * xFloat + bInt) % pInt) {
      const resultValue = find_torsion_order([xFloat, yFloat], aInt, bInt, pInt);
      if (resultValue === -1) {
        setResult("No torsion point found within the iteration limit.");
      } else {
        setResult(`The Torsion Point on the elliptical curve: (${resultValue})`);
      }
    } else {
      setResult(`The provided points are not on the elliptic curve defined by y^2 = x^3 + ${a}x + ${b} mod ${p}.`);
    }
  };

  return (
    <div className="hero flex min-h-screen">
    
    <div className="content bg-slate-500 flex-grow p-5 md:p-10 h-auto w-full ">
      <div className="AdditionOfTwopoint">
        <div className="text-5xl px-1 text-white">Finding The torsion Point</div>
        <div className="text-4xl pt-2 pb-2">
          For elliptic curve <span className="text-red-500">E(F<sub>p</sub>)</span>: Y<sup>2</sup> = X<sup>3</sup> + AX + B, <span className="text-green-500">p prime</span>
        </div>
  
        <div className="a px-1 pt-5 text-xl flex gap-3">
          <div id="inputLabel">
            <label htmlFor="a">Enter the coefficient of 'a':</label>
          </div>
          <div id="input">
            <input type="text" id="a" className="border rounded px-2 py-1" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
        </div>
  
        <div className="b px-1 pt-5 text-xl flex gap-3">
          <div id="inputLabel">
            <label htmlFor="b">Enter the coefficient of 'b':</label>
          </div>
          <div id="input">
            <input type="text" id="b" className="border rounded px-2 py-1" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        </div>
  
        <div className="c px-1 pt-5 text-xl flex gap-3">
          <div id="inputLabel">
            <label htmlFor="c">Enter the modulo 'p':</label>
          </div>
          <div id="input">
            <input type="text" id="c" className="border rounded px-2 py-1" value={p} onChange={(e) => setP(e.target.value)} />
          </div>
        </div>
  
        <div className="c px-1 pt-5 text-xl flex gap-3">
          <div id="inputLabel">
            <label htmlFor="x">Enter the x-coordinate of Point P:</label>
          </div>
          <div id="input">
            <input type="number" id="x" className="border rounded px-2 py-1 w-full" value={x} onChange={(e) => setX(e.target.value)} />
          </div>
        </div>
  
        <div className="c px-1 pt-5 text-xl flex gap-3">
          <div id="inputLabel">
            <label htmlFor="y">Enter the y-coordinate of Point P:</label>
          </div>
          <div id="input">
            <input type="number" id="y" className="border rounded px-2 py-1" value={y} onChange={(e) => setY(e.target.value)} />
          </div>
        </div>
  
        <button
          type="button"
          id="calculateButton"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mt-5 text-xl"
          onClick={handleCalculate}
        >
          Calculate
        </button>
  
        <div id="resultContainer" className="result pt-5 text-3xl text-black">{result}</div>
      </div>
    </div>
  </div>
  
  );
};

export default TorsionPoint;
