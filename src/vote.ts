import {Comment, CommentId, Entity, Issue, Sprint, Summary, User} from "./types/types";
import {User as StoryUser, VoteData} from "./types/stories";

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
        users: retUsers.map((user) => ({...user, valueText: (userIDsValue[user.id] && userIDsValue[user.id].toString()) || '0'}))
            .sort((a, b) => Number(b.valueText) - Number(a.valueText))
    }
}