import {Commit, Entity, Sprint} from "./types";
import {DiagramData} from "./stories";

export const diagramSlide = (sprint: Sprint, previousSprint: Sprint, commits: Commit[], allCommits: Commit[], entities: Entity[]): DiagramData => {
    const previousCommits = allCommits.filter((el) => el.timestamp > previousSprint.startAt && el.timestamp < previousSprint.finishAt);
    const currentSummaryIds: { [key: string]: boolean } = {};
    const previousSummaryIds: { [key: string]: boolean } = {};
    commits.forEach((el) => {
        if (Array.isArray(el.summaries)) {
            el.summaries.forEach((id) => currentSummaryIds[id] = true);
        } else {
            currentSummaryIds[el.summaries.id]=true;
        }
    })
    previousCommits.forEach((el) => {
        if (Array.isArray(el.summaries)) {
            el.summaries.forEach((id) => previousSummaryIds[id] =true);
        } else {
            previousSummaryIds[el.summaries.id] =true;
        }
    })
    const currentStats =  new Array(4).fill(0);
    const previousStats =  new Array(4).fill(0);
    const resolveArray = [100, 500, 1000, Infinity]
    entities.forEach((entity) => {
        if (entity.type === 'Summary') {
            let stats;
            if (currentSummaryIds[entity.id]) {
                stats = currentStats
            } else if (previousSummaryIds[entity.id]) {
                stats = previousStats
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
    differenceText: `${commits.length>previousCommits.length ? '+' : ''}${(commits.length-previousCommits.length)} с прошлого спринта`,
    categories: titleArray.map((title, i)=>({
        title,
        valueText: `${currentStats[i]} коммитов`,
        differenceText: `${currentStats[i]>previousStats[i] ? '+' : ''}${(currentStats[i]-previousStats[i])} с прошлого спринта`
    }))
}
}