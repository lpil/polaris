const interval = 15;
const smallestSideLength = Math.min(window.innerWidth, window.innerHeight);
const angleIncA = 0.15;
const angleIncB = angleIncA * 1.3;
const radiusA = smallestSideLength * 0.45;
const radiusB = smallestSideLength * 0.2;
const SVG = document.querySelector('.js-svg g');
const CENTER = Object.freeze(point(
  window.innerWidth / 2,
  window.innerHeight / 2
));


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

function iterate(angleA, angleB) {
  const a = circlePoint(radiusA, angleA);
  const b = circlePoint(radiusB, angleB);
  const line = center(straightLine(a, b));
  const elem = plotStraightLine(line)
  const next = function() { iterate(angleA + angleIncA, angleB + angleIncB) };
  setTimeout(next, interval);
}
iterate(0, 0);
