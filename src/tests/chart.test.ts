import {chartSlide} from "../chart";
import Sprints from './mocks/sprints.json';
import AllCommits from './mocks/allCommits.json';
import { sprint} from './mocks/common.mock'
import {chartOutput, leaders} from './mocks/chart.mock'
import {Commit, Sprint} from "../types/types";

describe('chart slide', ()=>{

    const allCommits: Commit[] = <Commit[]> AllCommits;
    const sprints: Sprint[] = <Sprint[]> Sprints;
    it('should return valid out', ()=>{
             expect(chartSlide(allCommits,sprints, sprint, leaders )).toEqual(chartOutput)
    })
    it('sum of commits should be equal commit length',()=>{
        expect(chartSlide(allCommits,sprints, sprint, leaders ).values.reduce((a,b)=>a+b.value,0)).toEqual(allCommits.length);
    })
})