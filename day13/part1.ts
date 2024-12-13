const content = await Deno.readTextFile("./day13/input.txt")

type factor = [number, number, number]
const regexp = /Button A: X\+(\d*), Y\+(\d*)\nButton B: X\+(\d*), Y\+(\d*)\nPrize: X=(\d*), Y=(\d*)/g
const data = content.matchAll(regexp).map((x) => x.slice(1).map((y) => parseInt(y)))

const findCoef = (btnA: factor, btnY: factor) => {
    for (let i = 0; i < btnA[2] / btnA[0]; i++) {
        const j = (btnA[2] - btnA[0] * i) / btnA[1]
        if (j % 1 === 0 && btnY[0] * i + btnY[1] * j === btnY[2]) return [i, j, i * 3 + j] as factor
    }
}

const find = (machine: number[]) => {
    const btnA: factor = [machine[0], machine[2], machine[4]]
    const btnB: factor = [machine[1], machine[3], machine[5]]
    return findCoef(btnA, btnB)
}

const res = [...data].map((x) => find(x))
console.log(res.reduce((acc, x) => acc + (x ? x[2] : 0), 0))
