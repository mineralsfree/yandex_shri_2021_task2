import {leadersSlide} from '../leaders';
import Commits from './mocks/commits.json'
import {resultDefault,resultsEmptyCommits, } from "./mocks/leaders.mock";
import {users, sprint} from './mocks/common.mock'
import {Commit} from "../types/types";

describe('Leaders slide', () => {
    const commits: Commit[] = <Commit[]>Commits;
    // console.log(leadersSlide([], users, sprint));
    it('should return valid out', () => {
         expect(leadersSlide(commits, users, sprint)).toEqual(resultDefault)
    })
    it ('should return empty values if no commits', ()=>{
        expect(leadersSlide([], users, sprint)).toEqual(resultsEmptyCommits)
    })
})