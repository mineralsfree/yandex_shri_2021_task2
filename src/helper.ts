import {Comment, CommentId, Commit, Entity, Issue, Summary} from "./types/types";

export const getSummaries = (commits: Commit[], entities: Entity[]): Summary[] => {
    const summaryIds: { [key: string]: boolean } = {};
    commits.forEach((commit) => {
                commit.summaries.forEach((summary) => {
                    if(typeof summary === 'number'){
                        summaryIds[summary] = true;
                    } else {
                        summaryIds[summary.id] =true;
                    }
                })
        }
    );

    return <Summary[]>entities.filter((entity) => entity.type === 'Summary' && summaryIds[entity.id])
}
export const getComments = (summaries: Summary[], issues: Issue[], entities: Entity[]): Comment[] => {
    const commentIds: { [key: string]: boolean } = {};
    let comments: Comment[] = [];
    function getComments(entityArr: Summary[] | Issue[]): void {
        entityArr.forEach((entity: Summary | Issue) => {
            if (entity.type!=='Summary' && entity.type!=='Issue') return;
            if (typeof entity.comments[0] === 'string') {
                entity.comments.forEach((comment: CommentId)=>commentIds[comment] = true)
            } else{
                entity.comments.forEach((comment: Comment)=>comments.push(comment))
            }
        })
    }
    getComments(issues);
    getComments(summaries);
    comments =   <Comment[]>entities.filter((entity) => entity.type === 'Comment' && commentIds[entity.id]).concat(comments);



    return comments
}