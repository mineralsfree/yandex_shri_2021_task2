import {Project, User, Commit, Summary} from "../types/types";
import Users from './mocks/users.json'
import Projects from './mocks/projects.json'
import Commits from './mocks/commits.json'
import Summaries from './mocks/summary.json'
import { getProjectEntities, getSummaries, getUserEntities} from "../helper";

describe('helper functions work correct', ()=>{
    const users:User[] = <User[]>Users;
    const projects: Project[] = <Project[]>Projects;
    const commit: Commit[] = <Commit[]>Commits;
    const summaries: Summary[] = <Summary[]>Summaries;
    it('users entities destructuring works correct', ()=>{
        expect(getUserEntities(users)[0].length).toEqual(12);
        expect(getUserEntities(users)[1].length).toEqual(3);
        expect(getUserEntities(users)[2].length).toEqual(2);

    })
    it('project entities destructuring works correct', ()=>{
        expect(getProjectEntities(projects)[0].length).toEqual(6);
        expect(getProjectEntities(projects)[1].length).toEqual(4);
    })
    it('getSummaries works correct', ()=>{
        //script counted
        expect(getSummaries(commit,summaries).length).toEqual(2134);
    })


})