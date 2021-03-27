import {diagramSlide} from "../diagram";
import {sprint } from './mocks/common.mock'
import {previousSprint, defaultOutput} from "./mocks/diagram.mock";
import Commits from './mocks/commits.json';
import PreviousCommits from './mocks/previousCommits.json'
import Entities from '../data/input.json'
import {Commit, Entity, Summary} from "../types/types";
import {getSummaries} from "../helper";
describe('diagram slide', ()=>{
    const commits = <Commit[]>Commits;
    const previousCommit = <Commit[]>PreviousCommits;
    const entities = <Entity[]>Entities;
    const summaries: Summary[] = <Summary[]>getSummaries(commits, entities);
    const previousSummaries: Summary[] = <Summary[]>getSummaries(previousCommit, entities);
    it('sum of commits in categories should be equal to total commits',()=>{
         expect(diagramSlide(sprint,previousSprint,commits,previousCommit, summaries, previousSummaries ).categories
             .reduce((a,b)=>(a + Number(b.valueText.split(' ')[0])),0))
             .toBe(Number(diagramSlide(sprint,previousSprint,commits,previousCommit, summaries, previousSummaries ).totalText.split(' ')[0]))
    })
    it('works correct with default values', ()=>{
        expect(diagramSlide(sprint,previousSprint,commits,previousCommit, summaries, previousSummaries )).toEqual(defaultOutput)
    })

})