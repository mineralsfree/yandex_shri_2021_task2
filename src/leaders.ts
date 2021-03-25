import {Commit, Sprint, User} from "./types/types";
import {LeadersData, User as StoryUser} from "./types/stories";

export const leadersSlide = (commits: Commit[], users: User[], sprint: Sprint): LeadersData => {
    const retUsers: StoryUser[] = users.map(({id, avatar, name}) => ({id, avatar, name, valueText: ''}));
    const userIDsValue: { [key: number]: number } = {}
    commits.forEach(({author}: Commit) => {
        if (typeof author === 'number') {
            userIDsValue[author] = userIDsValue[author] ? userIDsValue[author] += 1 : 1;
        } else {
            userIDsValue[author.id] = userIDsValue[author.id] ? userIDsValue[author.id] += 1 : 1;
        }
    })

    return {
        title: 'Больше всего коммитов',
        subtitle: `Спринт ${sprint.name}`,
        emoji: '👑',
        users: retUsers.map((user)=>({...user, valueText: (userIDsValue[user.id] && userIDsValue[user.id].toString()) || '0'} ))
            .sort((a,b)=>Number(b.valueText) - Number(a.valueText))
    }

}