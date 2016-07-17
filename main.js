const interval = 15;
const sideLength = Math.min(window.innerWidth, window.innerHeight);
const pointsA = 34;
const pointsB = 90;
const angleIncA = Math.PI * 2 / pointsA;
const angleIncB = Math.PI * 2 / pointsB;
const iterations = lowest_common_multiple(pointsA, pointsB);
const radius = sideLength * 0.5 - 10;
const SVG = document.querySelector('.js-svg g');
const CENTER = Object.freeze(point(
  window.innerWidth / 2,
  window.innerHeight / 2
));

function lowest_common_multiple(x, y) {
  return Math.abs((x * y) / greatest_common_denominator(x, y));
}

function greatest_common_denominator(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function center(shape) {
  switch (shape.type) {
    case 'STRAIGHT_LINE':
      return Object.assign(
        shape,
        {
          a: center(shape.a),
          b: center(shape.b),
        }
      );

    default:
      return Object.assign(
        shape,
        {
          x: shape.x + CENTER.x,
          y: shape.y + CENTER.y,
        }
      );
  }
}

function circlePoint(radius, angle) {
  return point(
    radius * Math.cos(angle),
    radius * Math.sin(angle)
  )
}

function point(x, y) {
  return { type: 'POINT', x, y };
}

function straightLine(a, b) {
  return { type: 'STRAIGHT_LINE', a, b, }
}

function plotStraightLine({ a, b }) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', a.x);
  line.setAttribute('y1', a.y);
  line.setAttribute('x2', b.x);
  line.setAttribute('y2', b.y);
  line.setAttribute('stroke', 'white');
  line.setAttribute('stroke-weight', 1);
  SVG.appendChild(line);
  return line;
}

function iterate(i, angleA, angleB) {
  if (i < 1) { return; }
  const a = circlePoint(radius, angleA);
  const b = circlePoint(radius, angleB);
  const line = center(straightLine(a, b));
  plotStraightLine(line)
  const next = function() {
    iterate(i - 1, angleA + angleIncA, angleB + angleIncB)
  };
  setTimeout(next, interval);
}
iterate(iterations, 0, 0);
