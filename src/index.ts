// import * as profiler from 'v8-profiler-node8';
// profiler.startProfiling('1', true);
import {Comment, Commit, Entity, Issue, Sprint, Summary, User} from "./types/types";
import {LeadersData, StoryData} from "./types/stories";
import fs from 'fs';


import data from "./data/input.json";
import {activitySlide} from "./activity";
import {getComments, getSummaries} from "./helper";
import {voteSlide} from "./vote";
import {leadersSlide} from "./leaders";
import {chartSlide} from "./chart";
import {diagramSlide} from "./diagram";


function prepareData(entities: Entity[], {sprintId}: { sprintId: number }): StoryData {
    const users: User[] = <User[]>entities.filter((el) => el.type === 'User');
    const sprints: Sprint[] = <Sprint[]>entities.filter((el) => el.type === "Sprint");
    const sortedSprints = sprints.slice(0).sort((a, b) => a.finishAt - b.finishAt);
    const allCommits = <Commit[]>entities.filter((el) => el.type === 'Commit')
    fs.writeFileSync('allCommits.json', JSON.stringify(allCommits));

    const sprint: Sprint = sprints.find((el: Entity) => el.id === sprintId);
    const previousSprint = sortedSprints[sortedSprints.findIndex(el => el.id === sprint.id) - 1];
    const commits: Commit[] = <Commit[]>allCommits.filter((el) => el.timestamp > sprint.startAt && el.timestamp < sprint.finishAt);

    const issues: Issue[] = <Issue[]>entities.filter((el) => el.type === "Issue" && el.createdAt > sprint.startAt && el.createdAt < sprint.finishAt)

    const summaries: Summary[] = <Summary[]>getSummaries(commits, entities);
    const comments: Comment[] = <Comment[]>getComments(summaries, issues, entities);
    // fs.writeFileSync('comments.json', JSON.stringify(comments))
    const leaderSlide: LeadersData = leadersSlide(commits, users, sprint);
    const leaders = leaderSlide.users;
    return [

        {
            alias: 'vote', data: voteSlide(users, comments, sprint)
        }, {
            alias: 'leaders', data: leaderSlide
        },
        {
            alias: 'chart', data: chartSlide(allCommits, sprints, sprint, leaders)
        },
        {
            alias: 'diagram', data: diagramSlide(sprint, previousSprint, commits, allCommits, entities)
        },
        {
            alias: 'activity', data: activitySlide(commits, sprint)
        },
    ];

}
//id 958- 996
let storyData: StoryData;
for (let i = 970; i <= 970; i++) {
    storyData = prepareData(<Entity[]>data, {sprintId: i});
    console.log(JSON.stringify(storyData.find((el)=>el.alias==='diagram')))
}
// const snapShot = profiler.stopProfiling('1');
//
// snapShot.export((err: any, res: any) => {
//     fs.writeFileSync('cpu_snap.cpuprofile', res);
// })
//console.log(JSON.stringify(storyData));
// fs.writeFileSync('./kek.js', 'export const data =' + JSON.stringify(storyData))
module.exports = { prepareData}