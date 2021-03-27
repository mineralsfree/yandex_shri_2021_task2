"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartSlide = void 0;
const chartSlide = (commits, sprints, currentSprint, users) => {
    const sprintsMap = {};
    const _sprints = sprints.slice(0).sort((a, b) => a.finishAt - b.finishAt);
    commits.forEach((commit, i) => {
        let sprint = _sprints
            .find((sprint) => sprint.startAt <= commit.timestamp && sprint.finishAt >= commit.timestamp);
        sprintsMap[sprint.id] = typeof sprintsMap[sprint.id] === 'number' ? sprintsMap[sprint.id] + 1 : 1;
    });
    return {
        title: 'Коммиты',
        subtitle: `Спринт ${currentSprint.name}`,
        values: _sprints.map((sprint) => {
            if (sprint.id === currentSprint.id) {
                return { title: '' + sprint.id, value: sprintsMap[sprint.id] || 0, active: true };
            }
            else {
                return { title: '' + sprint.id, value: sprintsMap[sprint.id] || 0 };
            }
        }),
        users
    };
};
exports.chartSlide = chartSlide;
//# sourceMappingURL=chart.js.map