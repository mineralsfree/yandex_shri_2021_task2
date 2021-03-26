import {activitySlide} from "../activity";
import Commits from './mocks/commits.json'
import {activityDefault, activityEmpty, } from './mocks/activity.mock'
import {sprint} from './mocks/common.mock';
import {Commit} from "../types/types";
describe('Activity slide', ()=>{
    let commits: Commit[] = <Commit[]>Commits;
    it('should return valid out' ,()=>{
        expect(activitySlide(commits, sprint)).toEqual(activityDefault)
    })
    it ('should return zeroed array on empty commit array', ()=>{
        expect(activitySlide([], sprint)).toEqual( activityEmpty);
    })
})