import {Commit, Sprint} from "./types/types";
import {ChartData, User} from "./types/stories";

export const chartSlide = (commits: Commit[], sprints: Sprint[], currentSprint: Sprint, users: User[]): ChartData => {
    const _sprints: (Sprint & { value?: number })[] = sprints.slice(0).sort((a, b) => a.finishAt - b.finishAt);
    commits.forEach((commit, i) => {
        let sprint: (Sprint & { value?: number }) = _sprints
            .find((sprint)=>sprint.startAt <= commit.timestamp && sprint.finishAt >= commit.timestamp  );
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