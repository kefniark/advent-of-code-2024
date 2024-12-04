// https://adventofcode.com/2024/day/3

const content = await Deno.readTextFile("./day03/input.txt")
const regexMul = /mul\((?<first>\d*),(?<second>\d*)\)/g
const regexOp = /(do|don't)\(\)/g

const mul = [...content.matchAll(regexMul)]
    .map((x) => [x.index, parseInt(x.groups.first) * parseInt(x.groups.second)] as [number, number])
    .sort((a, b) => a[0] - b[0])

const ops = [...content.matchAll(regexOp)]
    .map((x) => [x.index, x[1].indexOf("don") == -1] as [number, boolean])
    .sort((a, b) => a[0] - b[0])

const mulMap = new Map(mul)
const opMap = new Map(ops)

let sum = 0
let enable = true
for (let i = 0; i <= Math.max(mul[mul.length - 1][0], ops[ops.length - 1][0]); i++) {
    if (mulMap.has(i) && enable) sum += mulMap.get(i) ?? 0
    if (opMap.has(i)) enable = opMap.get(i) ?? false
}
console.log(sum)
