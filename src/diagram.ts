import {Commit, Entity, Sprint, Summary} from "./types/types";
import {DiagramData} from "./types/stories";
import {getEndings} from "./helper";

export const diagramSlide = (sprint: Sprint, previousSprint: Sprint,
                             commits: Commit[], previousCommits: Commit[],
                             summaries: Summary[], previousSummaries: Summary[]): DiagramData => {
    const currentStats =  new Array(4).fill(0);
    const previousStats =  new Array(4).fill(0);
    const resolveArray = [100, 500, 1000, Infinity]
    const summaryDiff: {[key: string]: number} = {}
    const previousSummaryDiff: {[key: string]: number} = {}
    summaries.forEach((summary)=>{
        summaryDiff[summary.id] = summary.removed+summary.added;
    })
    previousSummaries.forEach((summary)=>{
        previousSummaryDiff[summary.id] = summary.removed+summary.added
    })
    commits.forEach((commit) => {
        let diff = 0;
        commit.summaries.forEach(summary=>{
            if (typeof summary ==='number'){
              diff+=  summaryDiff[summary];
            } else {
                diff+= summaryDiff[summary.id];
            }
        })
        currentStats[resolveArray.findIndex((num) => diff <= num)]++;

    })
    previousCommits.forEach((commit) => {
        let diff = 0;
        commit.summaries.forEach(summary=>{
            if (typeof summary ==='number'){
                diff+= previousSummaryDiff[summary];
            } else {
                diff+= previousSummaryDiff[summary.id];
            }
        })
        previousStats[resolveArray.findIndex((num) => diff <= num)]++
    })
    const titleArray =["> 1001 строки", "501 — 1000 строк","101 — 500 строк","1 — 100 строк"]
return{
    title: "Размер коммитов",
    subtitle: `Спринт ${sprint.name}`,
    totalText: `${commits.length} ${getEndings('коммит', commits.length)}`,
    differenceText: `${commits.length-previousCommits.length>0 ? '+' : ''}${commits.length-previousCommits.length} с прошлого спринта`,
    categories: titleArray.map((title, i)=>({
        title,
        valueText: `${currentStats[i]} ${getEndings('коммит', currentStats[i])}`,
        differenceText: `${currentStats[i]>previousStats[i] ? '+' : ''}${(currentStats[i]-previousStats[i])} ${getEndings('коммит', currentStats[i]-previousStats[i])}`
    }))
}
}