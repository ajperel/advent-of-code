/**
 * Solutions for Advent of Code 2021, Day 16, Part 1.
 * Original problem: https://adventofcode.com/2021/day/16
 */


let testInputs = [
  [
    'D2FE28',
  ],
  [
    '38006F45291200',
  ],
  [
    'EE00D40C823060'
  ],
  [
    '8A004A801A8002F478',
    '620080001611562C8802118E34',
    'C0015000016115A2E0802F182340',
    'A0016C880162017C3686B18A3D4780',
  ]
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

let packetStrings = input.map(line => {
  let binaryStr = BigInt('0x' + line).toString(2);
  // Pad left to ensure size is a multiple of 8.
  if (binaryStr.length % 8 != 0) {
    let short = 8 - (binaryStr.length % 8);
    binaryStr = ''.padStart(short, 0) + binaryStr;
  }

  return binaryStr;
});


function parsePacket(packetStr) {
  let packetIndex = 0;
  let version = parseInt(packetStr.slice(packetIndex, packetIndex + 3), 2);
  let id = parseInt(packetStr.slice(packetIndex + 3, packetIndex + 6), 2);
  packetIndex += 6;

  // console.dir({
  //   packetStr,
  //   version,
  //   id,
  // });

  let packet = {
    str: packetStr,
    version,
    id
  }

  // ID is for a literal value
  if (id === 4) {
    packet.type = 'literal';

    let value = '';
    let lastPacket = false;
    while (!lastPacket) {
      lastPacket = parseInt(packetStr.slice(packetIndex, packetIndex + 1), 2) === 0;
      value += packetStr.slice(packetIndex + 1 , packetIndex + 5);
      packetIndex += 5;
    }

    packet.value = parseInt(value, 2);

    // console.dir({
    //   value: packet.value,
    //   packetIndex
    // });

  } else {
    packet.type = 'operator';
    // ID is for an operator
    packet.subPackets = [];
    let subPacket;

    let lengthTypeId = parseInt(packetStr.slice(packetIndex, packetIndex + 1), 2);
    packetIndex++;

    if (lengthTypeId === 0) {
      packet.subPacketlength = parseInt(packetStr.slice(packetIndex, packetIndex + 15), 2);
      packetIndex += 15;

      // console.log({
      //   packetIndex,
      //   subPacketlength,
      //   goal: packetIndex + subPacketlength,
      // });

      let finalPacketLength = packetIndex + packet.subPacketlength;
      while (packetIndex < finalPacketLength) {
        subPacket = parsePacket(packetStr.slice(packetIndex));
        packetIndex += subPacket.length;
        packet.subPackets.push(subPacket);
      }

    } else {
      packet.numSubPackets = parseInt(packetStr.slice(packetIndex, packetIndex + 11), 2);
      packetIndex += 11;

      for (let i = 0; i < packet.numSubPackets; i++) {
        subPacket = parsePacket(packetStr.slice(packetIndex));
        packetIndex += subPacket.length;
        packet.subPackets.push(subPacket);
      }
    }
  }

  packet.length = packetIndex;


  return packet;
}

let packets = packetStrings.map(packetStr => parsePacket(packetStr));

let getVersionSum = (packet) => {
  let versionSum = packet.version;
  if (packet.subPackets) {
    versionSum += packet.subPackets.reduce((sum, next) => sum + getVersionSum(next), 0);
  }

  return versionSum;
}

let versionSums = packets.map(packet => getVersionSum(packet));
let answer = versionSums.reduce((sum, n) => sum + n);

console.dir({
  packets: packets,
  versionSums,
  answer
}, {depth: null, colors: true});
