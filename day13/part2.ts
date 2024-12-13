const content = await Deno.readTextFile("./day13/input.txt")

type factor = [number, number, number]
const regexp = /Button A: X\+(\d*), Y\+(\d*)\nButton B: X\+(\d*), Y\+(\d*)\nPrize: X=(\d*), Y=(\d*)/g
const data = content.matchAll(regexp).map((x) => x.slice(1).map((y) => parseInt(y)))

// hum ... math magic ^^
const findCoef = (x: factor, y: factor) => {
    const i = (x[2] * y[1] - y[2] * x[1]) / (x[0] * y[1] - x[1] * y[0])
    const j = (y[2] * x[0] - x[2] * y[0]) / (x[0] * y[1] - x[1] * y[0])
    return (i % 1 === 0 && j % 1 === 0) ? [i, j, i * 3 + j] as factor : null
}

const find = (machine: number[]) => {
    const btnA: factor = [machine[0], machine[2], machine[4] + 10000000000000]
    const btnB: factor = [machine[1], machine[3], machine[5] + 10000000000000]
    return findCoef(btnA, btnB)
}

const res = [...data].map((x) => find(x))
console.log(res.reduce((acc, x) => acc + (x ? x[2] : 0), 0))
