"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndings = exports.getComments = exports.getUserEntities = exports.getProjectEntities = exports.getSummaries = void 0;
const getSummaries = (commits, entities) => {
    const summaryIds = {};
    let summaries = [];
    commits.forEach((commit) => {
        commit.summaries.forEach((summary) => {
            if (typeof summary === 'number') {
                summaryIds[summary] = true;
            }
            else {
                summaries.push(summary);
            }
        });
    });
    return [...summaries, ...entities.filter((entity) => entity.type === 'Summary' && summaryIds[entity.id])];
};
exports.getSummaries = getSummaries;
const getProjectEntities = (entities) => {
    let projects = entities.filter((el) => el.type === 'Project');
    for (let i = 0; i < projects.length; i++) {
        projects[i].dependencies.forEach((project) => {
            if (typeof project !== 'string') {
                projects.push(project);
            }
        });
    }
    let commits = [];
    let issues = [];
    projects.forEach((project) => {
        project.issues.forEach((issue) => {
            if (typeof issue !== 'string') {
                issues.push(issue);
            }
        });
        project.commits.forEach((commit) => {
            if (typeof commit !== 'string') {
                commits.push(commit);
            }
        });
    });
    return [commits, issues];
};
exports.getProjectEntities = getProjectEntities;
const getUserEntities = (entities) => {
    let users = entities.filter((el) => el.type === 'User');
    for (let i = 0; i < users.length; i++) {
        users[i].friends.forEach((friend) => {
            if (typeof friend !== 'number') {
                users.push(friend);
            }
        });
    }
    let commits = [];
    let comments = [];
    users.forEach((user) => {
        user.commits.forEach((commit) => {
            if (typeof commit !== 'string') {
                commits.push(commit);
            }
        });
        user.comments.forEach((comment) => {
            if (typeof comment !== 'string') {
                comments.push(comment);
            }
        });
    });
    return [users, commits, comments];
};
exports.getUserEntities = getUserEntities;
const getComments = (summaries, issues, entities) => {
    const commentIds = {};
    let comments = [];
    function getComments(entityArr) {
        entityArr.forEach((entity) => {
            if (entity.type !== 'Summary' && entity.type !== 'Issue')
                return;
            if (typeof entity.comments[0] === 'string') {
                entity.comments.forEach((comment) => commentIds[comment] = true);
            }
            else {
                entity.comments.forEach((comment) => comments.push(comment));
            }
        });
    }
    getComments(issues);
    getComments(summaries);
    comments = entities.filter((entity) => entity.type === 'Comment' && commentIds[entity.id]).concat(comments);
    return comments;
};
exports.getComments = getComments;
const getEndings = (root, num) => {
    const lastNum = String(num).slice(-1);
    if (lastNum === '1') {
        return root + '';
    }
    else if (lastNum === '2' || lastNum === '3' || lastNum === '4') {
        return root + 'а';
    }
    else {
        return root + 'ов';
    }
};
exports.getEndings = getEndings;
//# sourceMappingURL=helper.js.map