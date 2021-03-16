"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitySlide = void 0;
const activitySlide = (commits, sprint) => {
    let data = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };
    Object.keys(data).forEach((key) => data[key] = new Array(24).fill(0));
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', { weekday: "short" });
    commits.forEach((commit) => {
        const dateTime = new Date(commit.timestamp);
        data[dateTimeFormat.format(dateTime).toLowerCase()][dateTime.getHours()]++;
    });
    return {
        title: 'Коммиты, 1 неделя', subtitle: `Спринт ${sprint.name}`,
        data,
    };
};
exports.activitySlide = activitySlide;
//# sourceMappingURL=activity.js.map