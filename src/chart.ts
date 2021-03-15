import {Commit, Sprint} from "./types";
import {ChartData, User} from "./stories";

export const chartSlide = (commits: Commit[], sprints: Sprint[], currentSprint: Sprint, users: User[]): ChartData => {
    const biSearch = (s: Sprint[], key: number): any => {
        let start = 0;
        let end = s.length - 1;
        while (start <= end) {
            const m: number = Math.floor((start + end) / 2);
            if (key >= s[m].startAt && key <= s[m].finishAt) {
                return s[m];
            } else if (key > s[m].finishAt) {
                start = m + 1;
            } else {
                end = m - 1;
            }
        }
        return null;
    }
    const _sprints: (Sprint & { value?: number })[] = sprints.slice(0).sort((a, b) => a.finishAt - b.finishAt);
    commits.forEach((el, i) => {
        let sprint = biSearch(_sprints, el.timestamp);
        sprint.value = typeof sprint.value === 'number' ? sprint.value + 1 : 0;
    })

    return {
        title: 'Коммиты',
        subtitle: `Спринт ${currentSprint.name}`,
        values: _sprints.map((sprint) => {
            if (sprint.id === currentSprint.id) {
                return {title: ''+sprint.id, value: sprint.value || 0, active: true}
            } else {
                return {title: ''+sprint.id, value: sprint.value || 0};
            }
        }),
        users
    }
}