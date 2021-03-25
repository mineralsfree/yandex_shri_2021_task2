import {diagramSlide} from "../diagram";
import {sprint } from './mocks/common.mock'
import {previousSprint, defaultOutput} from "./mocks/diagram.mock";
import Commits from './mocks/commits.json';
import Entities from './mocks/summary.json'
import PreviousCommits from './mocks/previousCommits.json'
import {Commit, Entity} from "../types/types";
describe('diagram slide', ()=>{
    const commits = <Commit[]>Commits;
    const previousCommit = <Commit[]>PreviousCommits;
    const enitities = <Entity[]>Entities;
    console.log(sprint, previousSprint)
    it('should return valid out',()=>{
         expect(diagramSlide(sprint,previousSprint,commits, previousCommit, enitities )).toEqual(defaultOutput)

    })
})