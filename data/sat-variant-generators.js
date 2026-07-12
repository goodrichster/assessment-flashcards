(function initializeSatVariantGenerator(global) {
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomNonZeroInt(min, max) {
    let value = 0;
    while (value === 0) value = randomInt(min, max);
    return value;
  }

  function choose(values) {
    return values[randomInt(0, values.length - 1)];
  }

  function greatestCommonDivisor(a, b) {
    let left = Math.abs(a);
    let right = Math.abs(b);
    while (right) [left, right] = [right, left % right];
    return left || 1;
  }

  function formatDecimal(value, digits = 2) {
    return Number(value.toFixed(digits)).toString();
  }

  function formatPolynomial(a, b, c) {
    const leading = a === 1 ? "x^2" : `${a}x^2`;
    const linear = b === 0
      ? ""
      : ` ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`;
    const constant = c === 0 ? "" : ` ${c < 0 ? "-" : "+"} ${Math.abs(c)}`;
    return `${leading}${linear}${constant}`;
  }

  function makeVariant(card, front, back, integers) {
    if (!front || !back || front.includes("NaN") || back.includes("NaN")) {
      throw new Error(`Invalid generated variant for ${card.id}`);
    }

    return {
      ...card,
      front,
      back,
      variantIntegers: integers,
      isGeneratedVariant: true,
    };
  }

  const ratioPairs = [[2, 3], [3, 4], [3, 5], [4, 5], [5, 7]];
  const pythagoreanTriples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];

  const generators = {
    "m-2": (card) => {
      const coefficient = randomInt(2, 9);
      const solution = randomInt(3, 12);
      const constant = randomInt(2, 15);
      const operation = choose([1, -1]);
      const result = coefficient * solution + operation * constant;
      const sign = operation === 1 ? "+" : "-";
      return makeVariant(
        card,
        `Problem: Solve ${coefficient}x ${sign} ${constant} = ${result}.`,
        `${coefficient}x = ${coefficient * solution}, so x = ${solution}.`,
        [coefficient, solution, constant, result]
      );
    },

    "m-3": (card) => {
      const coefficient = randomInt(2, 5);
      const input = randomInt(2, 7);
      const constant = randomInt(1, 9);
      const operation = choose([1, -1]);
      const output = coefficient * input * input + operation * constant;
      const sign = operation === 1 ? "+" : "-";
      return makeVariant(
        card,
        `Problem: If g(x) = ${coefficient}x^2 ${sign} ${constant}, find g(${input}).`,
        `g(${input}) = ${coefficient}(${input}^2) ${sign} ${constant} = ${output}.`,
        [coefficient, input, constant, output]
      );
    },

    "m-6": (card) => {
      const rootA = randomInt(-8, -2);
      const rootB = randomInt(2, 8);
      const b = -(rootA + rootB);
      const c = rootA * rootB;
      return makeVariant(
        card,
        `Problem: Solve ${formatPolynomial(1, b, c)} = 0.`,
        `Factor as (x ${rootA < 0 ? "+" : "-"} ${Math.abs(rootA)})(x ${rootB < 0 ? "+" : "-"} ${Math.abs(rootB)}) = 0. The solutions are x = ${rootA} and x = ${rootB}.`,
        [rootA, rootB, b, c]
      );
    },

    "m-8": (card) => {
      const price = choose([60, 80, 100, 120, 160, 200]);
      const discount = choose([10, 20, 25, 30, 40, 50]);
      const discountAmount = price * discount / 100;
      const salePrice = price - discountAmount;
      return makeVariant(
        card,
        `Problem: An item costs $${price} and is discounted ${discount}%. What is the sale price?`,
        `The discount is $${formatDecimal(discountAmount)}. The sale price is $${formatDecimal(salePrice)}.`,
        [price, discount]
      );
    },

    "m-9": (card) => {
      const [a, b, c] = choose(pythagoreanTriples);
      const scale = randomInt(1, 2);
      const legA = a * scale;
      const legB = b * scale;
      const hypotenuse = c * scale;
      return makeVariant(
        card,
        `Problem: A right triangle has legs ${legA} and ${legB}. Find the hypotenuse.`,
        `c^2 = ${legA}^2 + ${legB}^2 = ${hypotenuse * hypotenuse}, so c = ${hypotenuse}.`,
        [legA, legB, hypotenuse]
      );
    },

    "m-10": (card) => {
      const count = randomInt(5, 8);
      const mean = randomInt(10, 25);
      const missing = randomInt(6, 30);
      const total = count * mean;
      const knownSum = total - missing;
      return makeVariant(
        card,
        `Problem: The mean of ${count} numbers is ${mean}. The other ${count - 1} numbers sum to ${knownSum}. What is the missing number?`,
        `The total is ${count}(${mean}) = ${total}. The missing number is ${total} - ${knownSum} = ${missing}.`,
        [count, mean, knownSum, missing]
      );
    },

    "m-13": (card) => {
      const coefficient = randomInt(2, 9);
      const constant = randomInt(1, 12);
      const boundary = randomInt(2, 12);
      const operator = choose(["<", ">"]);
      const result = coefficient * boundary + constant;
      return makeVariant(
        card,
        `Problem: Solve ${coefficient}x + ${constant} ${operator} ${result}.`,
        `${coefficient}x ${operator} ${coefficient * boundary}, so x ${operator} ${boundary}.`,
        [coefficient, constant, result, boundary]
      );
    },

    "m-14": (card) => {
      const x1 = randomInt(-5, 5);
      const y1 = randomInt(-10, 10);
      const run = randomInt(2, 6);
      const slope = randomNonZeroInt(-4, 4);
      const x2 = x1 + run;
      const y2 = y1 + slope * run;
      return makeVariant(
        card,
        `Problem: Find the slope between (${x1}, ${y1}) and (${x2}, ${y2}).`,
        `Slope = (${y2} - ${y1}) / (${x2} - ${x1}) = ${slope * run} / ${run} = ${slope}.`,
        [x1, y1, x2, y2, slope]
      );
    },

    "m-15": (card) => {
      const radius = randomInt(3, 12);
      const coefficient = 2 * radius;
      return makeVariant(
        card,
        `Problem: A circle has radius ${radius}. What is its circumference in terms of π?`,
        `C = 2πr = 2π(${radius}) = ${coefficient}π.`,
        [radius, coefficient]
      );
    },

    "m-16": (card) => {
      const squareFactor = choose([4, 9, 16, 25]);
      const squareFreeFactor = choose([2, 3, 5, 6]);
      const radicand = squareFactor * squareFreeFactor;
      const coefficient = Math.sqrt(squareFactor);
      return makeVariant(
        card,
        `Problem: Simplify √${radicand}.`,
        `√${radicand} = √${squareFactor} · √${squareFreeFactor} = ${coefficient}√${squareFreeFactor}.`,
        [squareFactor, squareFreeFactor, radicand, coefficient]
      );
    },

    "m-17": (card) => {
      const [firstPart, secondPart] = choose(ratioPairs);
      const scale = randomInt(3, 8);
      const secondCount = secondPart * scale;
      const firstCount = firstPart * scale;
      return makeVariant(
        card,
        `Problem: The ratio of boys to girls is ${firstPart}:${secondPart}. If there are ${secondCount} girls, how many boys are there?`,
        `Boys = ${secondCount}(${firstPart}/${secondPart}) = ${firstCount}.`,
        [firstPart, secondPart, secondCount, firstCount]
      );
    },

    "m-18": (card) => {
      const [firstPart, secondPart] = choose(ratioPairs);
      const scale = randomInt(7, 14);
      const secondCount = secondPart * scale;
      const firstCount = firstPart * scale;
      return makeVariant(
        card,
        `Problem: The ratio of boys to girls is ${firstPart}:${secondPart}. If there are ${secondCount} girls, how many boys are there?`,
        `Boys = ${secondCount}(${firstPart}/${secondPart}) = ${firstCount}.`,
        [firstPart, secondPart, secondCount, firstCount]
      );
    },

    "m-19": (card) => {
      const [legA, legB, hypotenuse] = choose(pythagoreanTriples);
      const opposite = choose([legA, legB]);
      const divisor = greatestCommonDivisor(opposite, hypotenuse);
      const numerator = opposite / divisor;
      const denominator = hypotenuse / divisor;
      return makeVariant(
        card,
        `Problem: In a right triangle, the side opposite θ is ${opposite} and the hypotenuse is ${hypotenuse}. What is sin(θ)?`,
        `sin(θ) = opposite/hypotenuse = ${opposite}/${hypotenuse} = ${numerator}/${denominator}.`,
        [opposite, hypotenuse, numerator, denominator]
      );
    },

    "m-20": (card) => {
      const a = randomInt(1, 2);
      const h = randomNonZeroInt(-5, 5);
      const k = randomInt(-9, 9);
      const b = -2 * a * h;
      const c = a * h * h + k;
      return makeVariant(
        card,
        `Problem: For y = ${formatPolynomial(a, b, c)}, what is the x-coordinate of the vertex?`,
        `Use x = -b/(2a): x = -(${b}) / (2 · ${a}) = ${h}.`,
        [a, b, c, h, k]
      );
    },

    "m-32": (card) => {
      const initial = randomInt(3, 9) * 100;
      const rate = choose([8, 10, 12, 15, 18, 20, 25]);
      const factor = (100 - rate) / 100;
      return makeVariant(
        card,
        `Problem: A value of ${initial} decreases by ${rate}% each year. Write an expression for the value after t years.`,
        `V(t) = ${initial}(${formatDecimal(factor)})^t.`,
        [initial, rate]
      );
    },

    "m-34": (card) => {
      const halfLife = randomInt(2, 6);
      const halfLives = randomInt(2, 3);
      const remaining = choose([12, 15, 18, 20, 24, 25]);
      const initial = remaining * 2 ** halfLives;
      const elapsed = halfLife * halfLives;
      return makeVariant(
        card,
        `Problem: A substance has a half-life of ${halfLife} hours and starts at ${initial} mg. How much remains after ${elapsed} hours?`,
        `That is ${halfLives} half-lives: ${initial}(1/2)^${halfLives} = ${remaining} mg.`,
        [halfLife, halfLives, initial, elapsed, remaining]
      );
    },

    "m-35": (card) => {
      const initial = choose([20000, 30000, 40000, 50000, 60000]);
      const rate = choose([3, 4, 5, 6, 8]);
      const years = randomInt(2, 4);
      const finalValue = Math.round(initial * (1 + rate / 100) ** years);
      return makeVariant(
        card,
        `Problem: A town's population was ${initial.toLocaleString("en-US")} and became approximately ${finalValue.toLocaleString("en-US")} after ${years} years of constant annual growth. What was the annual growth rate?`,
        `Use ${initial}(1 + r)^${years} ≈ ${finalValue}. Taking the ${years === 2 ? "square" : years === 3 ? "cube" : "fourth"} root gives 1 + r ≈ ${formatDecimal(1 + rate / 100)}, so r ≈ ${rate}%.`,
        [initial, finalValue, years, rate]
      );
    },

    "m-37": (card) => {
      let base;
      let yearlyIncrease;
      let rate;
      let years;
      let linearValue;
      let exponentialValue;

      do {
        base = choose([300, 400, 500, 600]);
        yearlyIncrease = choose([30, 40, 50, 60, 75]);
        rate = choose([5, 8, 10, 12, 15]);
        years = randomInt(2, 4);
        linearValue = base + yearlyIncrease * years;
        exponentialValue = base * (1 + rate / 100) ** years;
      } while (Math.abs(linearValue - exponentialValue) < 2);

      const exponentialDisplay = formatDecimal(exponentialValue);
      const winner = linearValue > exponentialValue ? "Plan A" : "Plan B";
      return makeVariant(
        card,
        `Problem: Plan A starts at ${base} and increases by ${yearlyIncrease} each year. Plan B starts at ${base} and grows ${rate}% yearly. Which is larger after ${years} years?`,
        `Plan A: ${base} + ${years}(${yearlyIncrease}) = ${linearValue}. Plan B: ${base}(1 + ${rate}/100)^${years} = ${exponentialDisplay}. ${winner} is larger.`,
        [base, yearlyIncrease, rate, years, linearValue]
      );
    },

    "m-38": (card) => {
      const principal = choose([800, 1000, 1200, 1500, 2000]);
      const rate = choose([4, 5, 6, 7, 8]);
      const years = randomInt(2, 4);
      const balance = principal * (1 + rate / 100) ** years;
      return makeVariant(
        card,
        `Problem: $${principal} is invested at ${rate}% annual interest compounded yearly. What is the balance after ${years} years?`,
        `A = ${principal}(1 + ${rate}/100)^${years} = $${balance.toFixed(2)}.`,
        [principal, rate, years]
      );
    },
  };

  global.SatVariantGenerator = Object.freeze({
    ids: Object.freeze(Object.keys(generators)),
    has(cardId) {
      return Object.hasOwn(generators, cardId);
    },
    generate(card) {
      const generator = generators[card?.id];
      return generator ? generator(card) : card;
    },
  });
})(typeof globalThis !== "undefined" ? globalThis : window);
