import {Comment, CommentId, Commit, Entity, Issue, Project, Summary, User} from "./types/types";

export const getSummaries = (commits: Commit[], entities: Entity[]): Summary[] => {
    const summaryIds: { [key: string]: boolean } = {};
    let summaries: Summary[] = []
    commits.forEach((commit) => {
                commit.summaries.forEach((summary) => {
                    if(typeof summary === 'number'){
                        summaryIds[summary] = true;
                    } else {
                        summaries.push(summary);
                    }
                })
        }
    );
    return [...summaries, ...<Summary[]>entities.filter((entity) => entity.type === 'Summary' && summaryIds[entity.id])]
}
export const getProjectEntities = (entities: Entity[]): [Commit[], Issue[]] =>{
    let projects: Project[] = <Project[]>entities.filter((el) => el.type === 'Project');
    for (let i = 0; i < projects.length; i++) {
        projects[i].dependencies.forEach((project)=>{
            if (typeof project !== 'string'){
                projects.push(project);
            }
        })
    }
    let commits: Commit[] = [];
    let issues: Issue[] = [];
    projects.forEach((project)=>{
        project.issues.forEach((issue)=>{
            if (typeof issue !== 'string'){
                issues.push(issue);
            }
        })
        project.commits.forEach((commit)=>{
            if (typeof commit !== 'string'){
                commits.push(commit);
            }
        })
    })
    return [commits, issues];
}
export const getUserEntities = (entities: Entity[]): [User[], Commit[], Comment[]]=>{
    let users = <User[]>entities.filter((el) => el.type === 'User');
    for (let i = 0; i <users.length; i++) {
        users[i].friends.forEach((friend)=>{
            if (typeof friend !== 'number'){
                users.push(friend);
            }
        })
    }
    let commits: Commit[] = [];
    let comments: Comment[] = [];
    users.forEach((user)=>{
        user.commits.forEach((commit)=>{
            if (typeof commit !== 'string'){
                commits.push(commit);
            }
        })
        user.comments.forEach((comment)=>{
            if (typeof comment !== 'string'){
                comments.push(comment);
            }
        })

    })
    return [users, commits, comments];
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
export const getEndings = (root: string, num: number ): string=>{
    const lastNum = String(num).slice(-1);
    if (lastNum==='1') {
        return root + '';
    } else if (lastNum==='2' || lastNum==='3' || lastNum==='4'){
        return root + 'а'
    } else {
        return root +'ов';
    }
}