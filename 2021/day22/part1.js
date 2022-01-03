/**
 * Solutions for Advent of Code 2021, Day 22, Part 1.
 * Original problem: https://adventofcode.com/2021/day/22
 */


let testInputs = [
  [
    'on x=10..12,y=10..12,z=10..12',
    'on x=11..13,y=11..13,z=11..13',
    'off x=9..11,y=9..11,z=9..11',
    'on x=10..10,y=10..10,z=10..10'
  ],
  [
    'on x=-20..26,y=-36..17,z=-47..7',
    'on x=-20..33,y=-21..23,z=-26..28',
    'on x=-22..28,y=-29..23,z=-38..16',
    'on x=-46..7,y=-6..46,z=-50..-1',
    'on x=-49..1,y=-3..46,z=-24..28',
    'on x=2..47,y=-22..22,z=-23..27',
    'on x=-27..23,y=-28..26,z=-21..29',
    'on x=-39..5,y=-6..47,z=-3..44',
    'on x=-30..21,y=-8..43,z=-13..34',
    'on x=-22..26,y=-27..20,z=-29..19',
    'off x=-48..-32,y=26..41,z=-47..-37',
    'on x=-12..35,y=6..50,z=-50..-2',
    'off x=-48..-32,y=-32..-16,z=-15..-5',
    'on x=-18..26,y=-33..15,z=-7..46',
    'off x=-40..-22,y=-38..-28,z=23..41',
    'on x=-16..35,y=-41..10,z=-47..6',
    'off x=-32..-23,y=11..30,z=-14..3',
    'on x=-49..-5,y=-3..45,z=-29..18',
    'off x=18..30,y=-20..-8,z=-3..13',
    'on x=-41..9,y=-7..43,z=-33..15',
    'on x=-54112..-39298,y=-85059..-49293,z=-27449..7877',
    'on x=967..23432,y=45373..81175,z=27513..53682'
  ],
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

const INPUT_REGEX = /(?<command>on|off) x=(?<x1>-?\d+)\.\.(?<x2>-?\d+),y=(?<y1>-?\d+)\.\.(?<y2>-?\d+),z=(?<z1>-?\d+)..(?<z2>-?\d+)/;

let instructions = input.map(line => {
  let {command, x1, x2, y1, y2, z1, z2} = INPUT_REGEX.exec(line).groups;
  return {
    command,
    cube: {
      xRange: [parseInt(x1), parseInt(x2)],
      yRange: [parseInt(y1), parseInt(y2)],
      zRange: [parseInt(z1), parseInt(z2)]
    }
  };
});

doCubesIntersect = (cube1, cube2) => {
  if ((cube2.xRange[0] > cube1.xRange[1] || cube1.xRange[0] > cube2.xRange[1]) ||
      (cube2.yRange[0] > cube1.yRange[1] || cube1.yRange[0] > cube2.yRange[1]) ||
      (cube2.zRange[0] > cube1.zRange[1] || cube1.zRange[0] > cube2.zRange[1])) {
    return false;
  }

  return true;
}

/**
 * Split cube1 into up to 7 distinct cubes, where the first one is the intersection between cube1
 * and cube2.
 */
splitCubeBasedOnIntersection = (cube1, cube2) => {
  // Up to 7 cubes: intersection, above, below, 4 sides
  let newCubes = [];

  let intersection = {
    xRange: [Math.max(cube1.xRange[0], cube2.xRange[0]), Math.min(cube1.xRange[1], cube2.xRange[1])],
    yRange: [Math.max(cube1.yRange[0], cube2.yRange[0]), Math.min(cube1.yRange[1], cube2.yRange[1])],
    zRange: [Math.max(cube1.zRange[0], cube2.zRange[0]), Math.min(cube1.zRange[1], cube2.zRange[1])],
  };
  newCubes.push(intersection);

  if (intersection.zRange[0] > cube1.zRange[0]) {
    newCubes.push({
      xRange: [...cube1.xRange],
      yRange: [...cube1.yRange],
      zRange: [cube1.zRange[0], intersection.zRange[0] - 1]
    });
  }

  if (intersection.zRange[1] < cube1.zRange[1]) {
    newCubes.push({
      xRange: [...cube1.xRange],
      yRange: [...cube1.yRange],
      zRange: [intersection.zRange[1] + 1, cube1.zRange[1]]
    });
  }

  if (intersection.yRange[0] > cube1.yRange[0]) {
    newCubes.push({
      xRange: [...cube1.xRange],
      yRange: [cube1.yRange[0], intersection.yRange[0] - 1],
      zRange: [...intersection.zRange]
    });
  }

  if (intersection.yRange[1] < cube1.yRange[1]) {
    newCubes.push({
      xRange: [...cube1.xRange],
      yRange: [intersection.yRange[1] + 1, cube1.yRange[1]],
      zRange: [...intersection.zRange]
    });
  }

  if (intersection.xRange[0] > cube1.xRange[0]) {
    newCubes.push({
      xRange: [cube1.xRange[0], intersection.xRange[0] - 1],
      yRange: [...intersection.yRange],
      zRange: [...intersection.zRange]
    });
  }

  if (intersection.xRange[1] < cube1.xRange[1]) {
    newCubes.push({
      xRange: [intersection.xRange[1] + 1, cube1.xRange[1]],
      yRange: [...intersection.yRange],
      zRange: [...intersection.zRange]
    });
  }

  return newCubes;
};

let truncateCube = cube => {
  cube.xRange[0] = Math.max(-50, cube.xRange[0]);
  cube.xRange[1] = Math.min(50, cube.xRange[1]);
  cube.yRange[0] = Math.max(-50, cube.yRange[0]);
  cube.yRange[1] = Math.min(50, cube.yRange[1]);
  cube.zRange[0] = Math.max(-50, cube.zRange[0]);
  cube.zRange[1] = Math.min(50, cube.zRange[1]);

  return cube;
}

let onCubes = [];
instructions.forEach(({command, cube}) => {
  // Ignore commands outside of a 101 point wide cube centered on the origin.
  if (cube.xRange[0] > 50 || cube.xRange[1] < -50 ||
      cube.yRange[0] > 50 || cube.yRange[1] < -50 ||
      cube.zRange[0] > 50 || cube.zRange[1] < -50) {
    return;
  }
  cube = truncateCube(cube);

  let nextOnCubes = [];

  onCubes.forEach(onCube => {
    if (doCubesIntersect(onCube, cube)) {
      nextOnCubes.push(...splitCubeBasedOnIntersection(onCube, cube).slice(1));
    } else {
      nextOnCubes.push(onCube);
    }
  });

  if (command === 'on') {
    nextOnCubes.push(cube);
  }

  // let numOnPoints = nextOnCubes.reduce((sum, cube) => {
  //   let x = Math.abs(cube.xRange[0] - cube.xRange[1]) + 1;
  //   let y = Math.abs(cube.yRange[0] - cube.yRange[1]) + 1;
  //   let z = Math.abs(cube.zRange[0] - cube.zRange[1]) + 1;

  //   return sum + (x * y * z);
  // }, 0);

  // console.dir({
  //   command,
  //   cube,
  //   onCubes,
  //   nextOnCubes,
  //   numOnPoints
  // }, {depth: null});

  onCubes = nextOnCubes;
});

let numOnPoints = onCubes.reduce((sum, cube) => {
  let x = Math.abs(cube.xRange[0] - cube.xRange[1]) + 1;
  let y = Math.abs(cube.yRange[0] - cube.yRange[1]) + 1;
  let z = Math.abs(cube.zRange[0] - cube.zRange[1]) + 1;

  return sum + (x * y * z);
}, 0);

console.dir({
  numOnPoints
}, {depth: null, color: true});
