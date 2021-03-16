"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadersSlide = void 0;
const leadersSlide = (commits, users, sprint) => {
    const retUsers = users.map(({ id, avatar, name }) => ({ id, avatar, name, valueText: '' }));
    const userIDsValue = {};
    commits.forEach(({ author }) => {
        if (typeof author === 'number') {
            userIDsValue[author] = userIDsValue[author] ? userIDsValue[author] += 1 : 1;
        }
        else {
            userIDsValue[author.id] = userIDsValue[author.id] ? userIDsValue[author.id] += 1 : 1;
        }
    });
    return {
        title: 'Больше всего коммитов',
        subtitle: `Спринт ${sprint.name}`,
        emoji: '👑',
        users: retUsers.map((user) => (Object.assign(Object.assign({}, user), { valueText: (userIDsValue[user.id] && userIDsValue[user.id].toString()) || '0' })))
            .sort((a, b) => Number(b.valueText) - Number(a.valueText))
    };
};
exports.leadersSlide = leadersSlide;
//# sourceMappingURL=leaders.js.map