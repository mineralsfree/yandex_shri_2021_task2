import {Comment, CommentId, Entity, Issue, Sprint, Summary, User} from "./types/types";
import {User as StoryUser, VoteData} from "./types/stories";
import {getEndings} from "./helper";

export const voteSlide = (users: User[], comments: Comment[], sprint: Sprint): VoteData => {

    const retUsers: StoryUser[] = users.map(({id, avatar, name}) => ({id, avatar, name, valueText: ''}));
    const userIDsValue: { [key: number]: number } = {}
    comments.forEach(({author, likes}: Comment) => {
        if (typeof author === 'number') {
            userIDsValue[author] = userIDsValue[author] ? userIDsValue[author] += likes.length : likes.length;
        } else {
            userIDsValue[author.id] = userIDsValue[author.id] ? userIDsValue[author.id] += likes.length : likes.length;
        }
    })
    return {
        title: 'Самый 🔎 внимательный разработчик',
        subtitle: `Спринт ${sprint.name}`,
        emoji: '🔎',
        users: retUsers.map((user) => {
            const value = userIDsValue[user.id]
            return ({...user,
                valueText: ((value && value.toString()) || '0') + ' ' + getEndings('голос', value || 0)})
        })
            .sort((a, b) => Number(b.valueText.split(' ')[0]) - Number(a.valueText.split(' ')[0]))
    }
}