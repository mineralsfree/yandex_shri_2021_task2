"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteSlide = void 0;
const helper_1 = require("./helper");
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
        users: retUsers.map((user) => {
            const value = userIDsValue[user.id];
            return (Object.assign(Object.assign({}, user), { valueText: ((value && value.toString()) || '0') + ' ' + helper_1.getEndings('голос', value || 0) }));
        })
            .sort((a, b) => Number(b.valueText.split(' ')[0]) - Number(a.valueText.split(' ')[0]))
    };
};
exports.voteSlide = voteSlide;
//# sourceMappingURL=vote.js.map