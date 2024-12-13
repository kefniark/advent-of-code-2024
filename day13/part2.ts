const content = await Deno.readTextFile("./day13/input.txt")

type factor = [number, number, number]
const regexp = /Button A: X\+(\d*), Y\+(\d*)\nButton B: X\+(\d*), Y\+(\d*)\nPrize: X=(\d*), Y=(\d*)/g
const data = content.matchAll(regexp).map((x) => x.slice(1).map((y) => parseInt(y)))

// hum ... math magic ^^ using substition
//
// with 2 equations: `U = Ax + By` and `V = Cx + Dy`
// For Y (we try to cancel X):
//    `CU = CAx + CBy` (equation multiplied by C) and `AV = ACx + ADy` (equation multiplied by A)
//    then substract 1st equation - 2nd equation (CAx cancel)
//    CU - AV = CBy - ADy => y (CB - AD) = CU - AV
// -> y = (CU - AV) / (CB - AD)
//
// Do the same for X (we try to cancel Y):
//    `DU = DAx + DBy` (equation multiplied by D) and `BV = BCx + BDy` (equation multiplied by B)
//    then 1st eq - 2nd equation (BDy cancel)
//    DU - BV = DAx - BCx => x (DA - BC) = DU - BV
// -> x = (DU - BV) / (DA - BC)
//
// Example for 94x + 22y = 8400 and 34x + 67y = 5400 (first example):
// with coef A = 94, B = 22, C = 34, D = 67, U = 8400, V = 5400
//    x = (DU - BV) / (DA - BC) = (67*8400 - 22*5400) / (67*94 - 22*34) = 80
//    y = (CU - AV) / (CB - AD) = (34*8400 - 94*5400) / (34*22 - 94*67) = 40
//
const findCoef = (x: factor, y: factor) => {
    const i = (y[1] * x[2] - x[1] * y[2]) / (y[1] * x[0] - x[1] * y[0])
    const j = (y[0] * x[2] - x[0] * y[2]) / (y[0] * x[1] - x[0] * y[1])
    return (i % 1 === 0 && j % 1 === 0) ? [i, j, i * 3 + j] as factor : null
}

const find = (machine: number[]) => {
    const btnA: factor = [machine[0], machine[2], machine[4] + 10000000000000]
    const btnB: factor = [machine[1], machine[3], machine[5] + 10000000000000]
    return findCoef(btnA, btnB)
}

const res = [...data].map((x) => find(x))
console.log(res.reduce((acc, x) => acc + (x ? x[2] : 0), 0))
