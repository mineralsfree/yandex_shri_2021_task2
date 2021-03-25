"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartSlide = void 0;
const chartSlide = (commits, sprints, currentSprint, users) => {
    const _sprints = sprints.slice(0).sort((a, b) => a.finishAt - b.finishAt);
    commits.forEach((commit, i) => {
        let sprint = _sprints
            .find((sprint) => sprint.startAt <= commit.timestamp && sprint.finishAt >= commit.timestamp);
        sprint.value = typeof sprint.value === 'number' ? sprint.value + 1 : 0;
    });
    return {
        title: 'Коммиты',
        subtitle: `Спринт ${currentSprint.name}`,
        values: _sprints.map((sprint) => {
            if (sprint.id === currentSprint.id) {
                return { title: '' + sprint.id, value: sprint.value || 0, active: true };
            }
            else {
                return { title: '' + sprint.id, value: sprint.value || 0 };
            }
        }),
        users
    };
};
exports.chartSlide = chartSlide;
//# sourceMappingURL=chart.js.map