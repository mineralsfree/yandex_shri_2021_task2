import {Commit, Sprint} from "./types/types";
import {ChartData, User} from "./types/stories";

export const chartSlide = (commits: Commit[], sprints: Sprint[], currentSprint: Sprint, users: User[]): ChartData => {
    const sprintsMap: {[key: number]: number} = {};
    const _sprints: Sprint[] = sprints.slice(0).sort((a, b) => a.finishAt - b.finishAt);
    commits.forEach((commit, i) => {
        let sprint: Sprint = _sprints
            .find((sprint)=>sprint.startAt <= commit.timestamp && sprint.finishAt >= commit.timestamp  );
        sprintsMap[sprint.id] = typeof sprintsMap[sprint.id] === 'number' ? sprintsMap[sprint.id] + 1 : 1
    })

    return {
        title: 'Коммиты',
        subtitle: `Спринт ${currentSprint.name}`,
        values: _sprints.map((sprint) => {
            if (sprint.id === currentSprint.id) {
                return {title: ''+sprint.id, value: sprintsMap[sprint.id] || 0, active: true}
            } else {
                return {title: ''+sprint.id, value: sprintsMap[sprint.id] || 0};
            }
        }),
        users
    }
}