"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.getSummaries = void 0;
const getSummaries = (commits, entities) => {
    const summaryIds = {};
    commits.forEach((commit) => {
        if (Array.isArray(commit.summaries)) {
            commit.summaries.forEach((summaryId) => {
                summaryIds[summaryId] = true;
            });
        }
        else {
            return [commit.summaries];
        }
    });
    return entities.filter((entity) => entity.type === 'Summary' && summaryIds[entity.id]);
};
exports.getSummaries = getSummaries;
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
//# sourceMappingURL=helper.js.map