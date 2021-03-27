"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagramSlide = void 0;
const helper_1 = require("./helper");
const diagramSlide = (sprint, previousSprint, commits, previousCommits, summaries, previousSummaries) => {
    const currentStats = new Array(4).fill(0);
    const previousStats = new Array(4).fill(0);
    const resolveArray = [100, 500, 1000, Infinity];
    const summaryDiff = {};
    const previousSummaryDiff = {};
    summaries.forEach((summary) => {
        summaryDiff[summary.id] = summary.removed + summary.added;
    });
    previousSummaries.forEach((summary) => {
        previousSummaryDiff[summary.id] = summary.removed + summary.added;
    });
    commits.forEach((commit) => {
        let diff = 0;
        commit.summaries.forEach(summary => {
            if (typeof summary === 'number') {
                diff += summaryDiff[summary];
            }
            else {
                diff += summaryDiff[summary.id];
            }
        });
        currentStats[resolveArray.findIndex((num) => diff <= num)]++;
    });
    previousCommits.forEach((commit) => {
        let diff = 0;
        commit.summaries.forEach(summary => {
            if (typeof summary === 'number') {
                diff += previousSummaryDiff[summary];
            }
            else {
                diff += previousSummaryDiff[summary.id];
            }
        });
        previousStats[resolveArray.findIndex((num) => diff <= num)]++;
    });
    const titleArray = ["> 1001 строки", "501 — 1000 строк", "101 — 500 строк", "1 — 100 строк"];
    return {
        title: "Размер коммитов",
        subtitle: `Спринт ${sprint.name}`,
        totalText: `${commits.length} ${helper_1.getEndings('коммит', commits.length)}`,
        differenceText: `${commits.length - previousCommits.length > 0 ? '+' : ''}${commits.length - previousCommits.length} с прошлого спринта`,
        categories: titleArray.map((title, i) => ({
            title,
            valueText: `${currentStats[i]} ${helper_1.getEndings('коммит', currentStats[i])}`,
            differenceText: `${currentStats[i] > previousStats[i] ? '+' : ''}${(currentStats[i] - previousStats[i])} ${helper_1.getEndings('коммит', currentStats[i] - previousStats[i])}`
        }))
    };
};
exports.diagramSlide = diagramSlide;
//# sourceMappingURL=diagram.js.map