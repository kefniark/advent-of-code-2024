// https://adventofcode.com/2024/day/3

const content = await Deno.readTextFile("./day03/input.txt")
const regexp = /mul\((?<first>\d*),(?<second>\d*)\)/g
const count = content.matchAll(regexp)
    .reduce((count, x) => count + parseInt(x.groups.first) * parseInt(x.groups.second), 0)
console.log(count)
