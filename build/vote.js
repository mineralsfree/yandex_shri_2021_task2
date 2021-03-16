"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteSlide = void 0;
const voteSlide = (users, comments, sprint) => {
    const retUsers = users.map(({ id, avatar, name }) => ({ id, avatar, name, valueText: '' }));
    const userIDsValue = {};
    comments.forEach(({ author, likes }) => {
        if (typeof author === 'number') {
            userIDsValue[author] = userIDsValue[author] ? userIDsValue[author] += likes.length : likes.length;
        }
        else {
            userIDsValue[author.id] = userIDsValue[author.id] ? userIDsValue[author.id] += likes.length : likes.length;
        }
    });
    return {
        title: 'Самый 🔎 внимательный разработчик',
        subtitle: `Спринт ${sprint.name}`,
        emoji: '🔎',
        users: retUsers.map((user) => (Object.assign(Object.assign({}, user), { valueText: (userIDsValue[user.id] && userIDsValue[user.id].toString()) || '0' })))
            .sort((a, b) => Number(b.valueText) - Number(a.valueText))
    };
};
exports.voteSlide = voteSlide;
//# sourceMappingURL=vote.js.map