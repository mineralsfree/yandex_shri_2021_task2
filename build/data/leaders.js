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
    return retUsers;
};
exports.leadersSlide = leadersSlide;
//# sourceMappingURL=leaders.js.map