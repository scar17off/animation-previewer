export const animations = {
  circle: (iteration, index, totalPoints, radius, speed) => {
    const baseAngle = (index / totalPoints) * Math.PI * 2;
    const rotationAngle = iteration * speed;
    const angle = baseAngle + rotationAngle - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  },

  expandingCircle: (iteration, index, totalPoints, radius, speed) => {
    const angle = (index / totalPoints) * Math.PI * 2;
    const scale = 1 + Math.sin(iteration * speed);
    const x = radius * Math.cos(angle) * scale;
    const y = radius * Math.sin(angle) * scale;
    return { x, y };
  },

  wave: (iteration, index, totalPoints, radius, speed) => {
    const x = radius * Math.cos((2 * Math.PI / totalPoints) * index + iteration * speed);
    const y = radius * Math.sin((2 * Math.PI * 2 / totalPoints) * index + iteration * speed);
    return { x, y };
  },

  eight: (iteration, index, totalPoints, radius, speed) => {
    const t = iteration * speed;
    const angle = (index / totalPoints) * Math.PI * 2 + t;

    // Lemniscate of Bernoulli formula
    const scale = radius / 1.4142; // sqrt(2) to fit in radius
    const denom = 1 + Math.sin(angle) * Math.sin(angle);

    // Swap x and y, negate y to rotate 90 degrees clockwise
    const x = scale * Math.sin(2 * angle) / 2;
    const y = -scale * Math.cos(angle) * Math.cos(t);

    return { x, y };
  },

  triangle: (iteration, index, totalPoints, radius, speed) => {
    const t = Math.PI * 2 / totalPoints * index + iteration * speed;
    const x = (2 * Math.sin(t) + Math.sin(2 * t)) * radius / 2;
    const y = (2 * Math.cos(t) - Math.cos(2 * t)) * radius / 2;
    return { x, y };
  },

  diskX: (iteration, index, totalPoints, radius, speed) => {
    const t = Math.PI * 2 / totalPoints * index + iteration * speed;
    const t1 = Math.PI * 2 / totalPoints * index - iteration * speed;

    if (index % 2 === 0) {
      const x = Math.cos(t) * (radius * 1.5);
      const y = Math.sin(t1) * (radius * 1.5);
      return { x, y };
    } else {
      const x = Math.cos(t1) * radius;
      const y = Math.sin(t) * radius;
      return { x, y };
    }
  },

  lemniscate: (iteration, index, totalPoints, radius, speed) => {
    const t = iteration * speed + (index / totalPoints) * Math.PI * 2;
    const x = (radius * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
    const y = (radius * Math.cos(t) * Math.sin(t)) / (1 + Math.sin(t) * Math.sin(t));
    return { x, y };
  },

  spiral: (iteration, index, totalPoints, radius, speed) => {
    const growth = 0.1;
    const baseAngle = (index / totalPoints) * Math.PI * 2;
    const baseRadius = radius * baseAngle * growth;
    const rotationAngle = iteration * speed;
    const angle = baseAngle + rotationAngle;
    const x = baseRadius * Math.cos(angle);
    const y = baseRadius * Math.sin(angle);
    return { x, y };
  },

  copyDisk: (iteration, index, totalPoints, radius, speed) => {
    const t = Math.PI * 2 / totalPoints * index + iteration * speed;
    const t1 = Math.PI / totalPoints * index + iteration * speed;
    const x = (2 * Math.sin(t) + Math.sin(2 * t1)) * radius / 2;
    const y = (2 * Math.cos(t) - Math.cos(2 * t1)) * radius / 2;
    return { x, y };
  },

  square: (iteration, index, totalPoints, radius, speed) => {
    const t = iteration * speed * 0.1;
    const basePosition = index / totalPoints;
    const position = (basePosition + t) % 1;
    const sidePosition = position * 4; // Four sides
    const sideIndex = Math.floor(sidePosition);
    const progress = sidePosition % 1; // Progress within current side

    switch (sideIndex) {
      case 0: // Top: left to right
        return {
          x: radius * (-1 + 2 * progress),
          y: -radius
        };
      case 1: // Right: top to bottom
        return {
          x: radius,
          y: radius * (-1 + 2 * progress)
        };
      case 2: // Bottom: right to left
        return {
          x: radius * (1 - 2 * progress),
          y: radius
        };
      case 3: // Left: bottom to top
        return {
          x: -radius,
          y: radius * (1 - 2 * progress)
        };
    }
  },

  topBottom: (iteration, index, totalPoints, radius, speed) => {
    const t = iteration * speed;
    const xPos = (index / totalPoints) * 2 - 1; // -1 to 1
    return {
      x: radius * xPos,
      y: radius * Math.sin(t + xPos * Math.PI)
    };
  },

  x: (iteration, index, totalPoints, radius, speed) => {
    const r = 2 * Math.PI * 2 / totalPoints * index + iteration * speed;
    if (index % 2 === 0) {
      const s = Math.sin(r);
      return {
        x: (s * 15 + 3 * s) * radius / 15,
        y: (Math.cos(r) * 3 + 15 * s) * radius / 15
      };
    } else {
      const c = Math.cos(r);
      return {
        x: (c * 8 + 9 * c) * radius / 15,
        y: (Math.sin(r) * 3 + -15 * c) * radius / 15
      };
    }
  },

  rightLeft: (iteration, index, totalPoints, radius, speed) => {
    const t = iteration * speed;
    const yPos = (index / totalPoints) * 2 - 1; // -1 to 1
    return {
      x: radius * Math.sin(t + yPos * Math.PI),
      y: radius * yPos
    };
  },

  randomTB: (iteration, index, totalPoints, radius, speed) => {
    const x = Math.cos(2 - totalPoints * index - iteration * speed) * radius;
    const y = Math.sin(2 / totalPoints * index + iteration * speed) * radius;
    return { x, y };
  },

  atom: (iteration, index, totalPoints, radius, speed) => {
    if (index >= totalPoints / 2) {
      const x = Math.cos(2 * Math.PI * 2 / totalPoints * index + iteration * speed) * radius / 2;
      const y = Math.sin(2 * Math.PI * 2 / totalPoints * index + iteration * speed + 2) * radius / 2;
      return { x, y };
    } else {
      const x = Math.cos(2 * Math.PI * 2 / totalPoints * index + iteration * speed + 2) * radius / 2;
      const y = Math.sin(2 * Math.PI * 2 / totalPoints * index + iteration * speed) * radius / 2;
      return { x, y };
    }
  },

  verticalSectorCircle: (iteration, index, totalPoints, radius, speed) => {
    const t = iteration * speed;
    const angle = (index / totalPoints) * Math.PI - Math.PI / 2; // -PI/2 to PI/2
    return {
      x: radius * Math.cos(angle) * Math.cos(t),
      y: radius * Math.sin(angle)
    };
  },

  horizontalSectorCircle: (iteration, index, totalPoints, radius, speed) => {
    const t = iteration * speed;
    const angle = (index / totalPoints) * Math.PI - Math.PI / 2; // -PI/2 to PI/2
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle) * Math.cos(t)
    };
  },

  rhombus: (iteration, index, totalPoints, radius, speed) => {
    const t = iteration * speed;
    const phase = (index / totalPoints) * Math.PI * 2;
    const x = radius * Math.cos(phase + t);
    const y = radius * Math.sin(phase + t);
    return {
      x: x * Math.cos(Math.PI / 4) - y * Math.sin(Math.PI / 4),
      y: x * Math.sin(Math.PI / 4) + y * Math.cos(Math.PI / 4)
    };
  },

  heart: (iteration, index, totalPoints, radius, speed) => {
    const t = iteration * speed;
    const angle = (index / totalPoints) * Math.PI * 2 + t;

    const x = radius * Math.pow(Math.sin(angle), 3);
    const y = radius * (
      -0.8125 * Math.cos(angle) +
      0.3125 * Math.cos(2 * angle) +
      0.125 * Math.cos(3 * angle) +
      0.0625 * Math.cos(4 * angle)
    );

    return { x, y };
  }
};

export const initializePoints = (count, radius) => {
  const points = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    points.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    });
  }

  return points;
}; 