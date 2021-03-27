import {Comment, Commit, Entity, Issue, Sprint, Summary, User} from "./types/types";
import {LeadersData, StoryData} from "./types/stories";

import {activitySlide} from "./activity";
import {getComments, getProjectEntities, getSummaries, getUserEntities} from "./helper";
import {voteSlide} from "./vote";
import {leadersSlide} from "./leaders";
import {chartSlide} from "./chart";
import {diagramSlide} from "./diagram";
function prepareData(entities: Entity[], {sprintId}: { sprintId: number }): StoryData {
    const [users, userCommits, userComments]: [User[], Commit[], Comment[]] = getUserEntities(entities);

    const [projectCommits, projectIssues]: [Commit[], Issue[]] = getProjectEntities(entities);
    const sprints: Sprint[] = <Sprint[]>entities.filter((el) => el.type === "Sprint");
    const sortedSprints = sprints.slice(0).sort((a, b) => a.finishAt - b.finishAt);
    const allCommits = [
        ...<Commit[]>entities.filter((el) => el.type === 'Commit'),
        ...userCommits,
        ...projectCommits
    ]
    const sprint: Sprint = sprints.find((el: Entity) => el.id === sprintId);
    const previousSprint = sortedSprints[sortedSprints.findIndex(el => el.id === sprint.id) - 1];
    const commits: Commit[] = <Commit[]>allCommits.filter((el) => el.timestamp > sprint.startAt && el.timestamp < sprint.finishAt);
    const previousCommits: Commit[] = previousSprint?  <Commit[]>allCommits.filter((el) => el.timestamp > previousSprint.startAt && el.timestamp < previousSprint.finishAt) : [];
    const issues: Issue[] = [
        ...<Issue[]>entities.filter((el) => el.type === "Issue" && el.createdAt > sprint.startAt && el.createdAt < sprint.finishAt),
        ...projectIssues.filter((el) => el.type === "Issue" && el.createdAt > sprint.startAt && el.createdAt < sprint.finishAt)
    ];
    const summaries: Summary[] = <Summary[]>getSummaries(commits, entities);
    const previousSummaries: Summary[] = <Summary[]>getSummaries(previousCommits, entities);

    const comments: Comment[] = <Comment[]>getComments(summaries, issues, [...entities, ...userComments]);
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
            alias: 'diagram', data: diagramSlide(sprint, previousSprint, commits, previousCommits, summaries, previousSummaries)
        },
        {
            alias: 'activity', data: activitySlide(commits, sprint)
        },
    ];

}
module.exports = {prepareData}