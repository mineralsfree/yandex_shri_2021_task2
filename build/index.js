"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activity_1 = require("./activity");
const helper_1 = require("./helper");
const vote_1 = require("./vote");
const leaders_1 = require("./leaders");
const chart_1 = require("./chart");
const diagram_1 = require("./diagram");
function prepareData(entities, { sprintId }) {
    const users = entities.filter((el) => el.type === 'User');
    const sprints = entities.filter((el) => el.type === "Sprint");
    const sortedSprints = sprints.slice(0).sort((a, b) => a.finishAt - b.finishAt);
    const allCommits = entities.filter((el) => el.type === 'Commit');
    const sprint = sprints.find((el) => el.id === sprintId);
    const previousSprint = sortedSprints[sortedSprints.findIndex(el => el.id === sprint.id) - 1];
    const commits = allCommits.filter((el) => el.timestamp > sprint.startAt && el.timestamp < sprint.finishAt);
    const issues = entities.filter((el) => el.type === "Issue" && el.createdAt > sprint.startAt && el.createdAt < sprint.finishAt);
    const summaries = helper_1.getSummaries(commits, entities);
    const comments = helper_1.getComments(summaries, issues, entities);
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
            alias: 'diagram', data: diagram_1.diagramSlide(sprint, previousSprint, commits, allCommits, entities)
        },
        {
            alias: 'activity', data: activity_1.activitySlide(commits, sprint)
        },
    ];
}
module.exports = { prepareData };
//# sourceMappingURL=index.js.map