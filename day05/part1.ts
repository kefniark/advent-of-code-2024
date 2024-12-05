const content = await Deno.readTextFile("./day05/test.txt")

const regexOrderRule = /(?<first>\d*)\|(?<second>\d*)/g
const orderRules = content.split("\n")
    .filter((x) => x.match(regexOrderRule))
    .map((x) => {
        const count = [...x.matchAll(regexOrderRule)][0]!
        return [parseInt(count.groups.first), parseInt(count.groups.second)] as [number, number]
    })

const regexPageUpdates = /(\d*,)+\d*/g
const pageUpdates = content.split("\n")
    .filter((x) => x.match(regexPageUpdates))
    .map((x) => x.split(",").map((x) => parseInt(x)))

const isUpdateValid = (update: number[]) =>
    update.every((page, pageIdx) => {
        const ruleAfter = orderRules.filter((x) => x[0] === page).map((x) => x[1])
        return update.slice(0, pageIdx).every((x) => ruleAfter.indexOf(x) == -1)
    })

const res = pageUpdates
    .filter((x) => isUpdateValid(x))
    .map((x) => x[(x.length - 1) / 2])
    .reduce((count, cur) => count + cur, 0)
console.log(res)
