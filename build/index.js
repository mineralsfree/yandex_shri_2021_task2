"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_1 = require("./activity");
const helper_1 = require("./helper");
const vote_1 = require("./vote");
const leaders_1 = require("./leaders");
const chart_1 = require("./chart");
const diagram_1 = require("./diagram");
const input_json_1 = __importDefault(require("./data/input.json"));
const fs_1 = __importDefault(require("fs"));
function prepareData(entities, { sprintId }) {
    const [users, userCommits, userComments] = helper_1.getUserEntities(entities);
    const [projectCommits, projectIssues] = helper_1.getProjectEntities(entities);
    const sprints = entities.filter((el) => el.type === "Sprint");
    const sortedSprints = sprints.slice(0).sort((a, b) => a.finishAt - b.finishAt);
    const allCommits = [
        ...entities.filter((el) => el.type === 'Commit'),
        ...userCommits,
        ...projectCommits
    ];
    const sprint = sprints.find((el) => el.id === sprintId);
    const previousSprint = sortedSprints[sortedSprints.findIndex(el => el.id === sprint.id) - 1];
    const commits = allCommits.filter((el) => el.timestamp > sprint.startAt && el.timestamp < sprint.finishAt);
    const previousCommits = previousSprint ? allCommits.filter((el) => el.timestamp > previousSprint.startAt && el.timestamp < previousSprint.finishAt) : [];
    const issues = [
        ...entities.filter((el) => el.type === "Issue" && el.createdAt > sprint.startAt && el.createdAt < sprint.finishAt),
        ...projectIssues.filter((el) => el.type === "Issue" && el.createdAt > sprint.startAt && el.createdAt < sprint.finishAt)
    ];
    const summaries = helper_1.getSummaries(commits, entities);
    const previousSummaries = helper_1.getSummaries(previousCommits, entities);
    const comments = helper_1.getComments(summaries, issues, [...entities, ...userComments]);
    const leaderSlide = leaders_1.leadersSlide(commits, users, sprint);
    const leaders = leaderSlide.users;
    return [
        {
            alias: 'vote', data: vote_1.voteSlide(users, comments, sprint)
        }, {
            alias: 'leaders', data: leaderSlide
        },
        {
            alias: 'chart', data: chart_1.chartSlide(allCommits, sprints, sprint, leaders)
        },
        {
            alias: 'diagram', data: diagram_1.diagramSlide(sprint, previousSprint, commits, previousCommits, summaries, previousSummaries)
        },
        {
            alias: 'activity', data: activity_1.activitySlide(commits, sprint)
        },
    ];
}
let storyData;
for (let i = 970; i <= 970; i++) {
    storyData = prepareData(input_json_1.default, { sprintId: i });
}
fs_1.default.writeFileSync('output.json', JSON.stringify(storyData));
module.exports = { prepareData };
//# sourceMappingURL=index.js.map