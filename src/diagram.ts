import {Commit, Entity, Sprint} from "./types/types";
import {DiagramData} from "./types/stories";

export const diagramSlide = (sprint: Sprint, previousSprint: Sprint, commits: Commit[], allCommits: Commit[], entities: Entity[]): DiagramData => {

    const previousCommits = previousSprint ? allCommits.filter((el) => el.timestamp > previousSprint.startAt && el.timestamp < previousSprint.finishAt) : [];
    const currentSummaryIds: { [key: string]: boolean } = {};
    const previousSummaryIds: { [key: string]: boolean } = {};
    commits.forEach((commit) => {
        commit.summaries.forEach(summary=>{
            if (typeof summary ==='number'){
                currentSummaryIds[summary] = true;
            } else {
                currentSummaryIds[summary.id] = true;
            }
        })
    })
    previousCommits.forEach((commit) => {
        commit.summaries.forEach(summary=>{
            if (typeof summary ==='number'){
                previousSummaryIds[summary] = true;
            } else {
                previousSummaryIds[summary.id] = true;
            }
        })
    })
    const currentStats =  new Array(4).fill(0);
    const previousStats =  new Array(4).fill(0);
    const resolveArray = [100, 500, 1000, Infinity]
    let i = 0;
    entities.forEach((entity) => {
        if (entity.type === 'Summary') {
            let stats;

            if (currentSummaryIds[entity.id]) {
                stats = currentStats
                i+=(entity.added + entity.removed)

            } else if (previousSummaryIds[entity.id]) {
                stats = previousStats
                i-=(entity.added + entity.removed)
            } else {
              return;
            }
            let diff = entity.added + entity.removed;
            stats[resolveArray.findIndex((num) => diff <= num)]++;
        }
    })
    const titleArray =["> 1001 строки", "501 — 1000 строк","101 — 500 строк","1 — 100 строк"]
return{
    title: "Размер коммитов",
    subtitle: `Спринт ${sprint.name}`,
    totalText: `${commits.length}`,
    differenceText: `${i ? '+' : ''}${i} с прошлого спринта`,
    categories: titleArray.map((title, i)=>({
        title,
        valueText: `${currentStats[i]} коммитов`,
        differenceText: `${currentStats[i]>previousStats[i] ? '+' : ''}${(currentStats[i]-previousStats[i])} с прошлого спринта`
    }))
}
}