import {voteSlide} from '../vote';
import Comments from './mocks/comments.json'
import {Comment} from "../types/types";
import {users, sprint} from './mocks/common.mock'
import {defaultResult, emptyValueResult} from './mocks/vote.mock'
describe('vote slide',()=>{
    const comments: Comment[] = <Comment[]>Comments;
        console.log(voteSlide(users, [], sprint))
     it('should return valid out', ()=>{
         expect(voteSlide(users, comments, sprint)).toEqual(defaultResult)
    })
    it('vote slide with empty comments', ()=>{
        expect(voteSlide(users, [], sprint)).toEqual(emptyValueResult)

    })
})