import {Commit, Sprint} from "./types/types";
import {ActivityData, StoryData} from "./types/stories";

type dayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const activitySlide = (commits: Commit[], sprint: Sprint): ActivityData => {
    let data: ActivityData["data"] = {mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: []};
    Object.keys(data).forEach((key: dayOfWeek) => data[key] = new Array(24).fill(0));
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', {weekday: "short"})
    commits.forEach((commit) => {
        const dateTime = new Date(commit.timestamp);
        data[<dayOfWeek>dateTimeFormat.format(dateTime).toLowerCase()][dateTime.getHours()]++;
    })
    return {
            title: 'Коммиты, 1 неделя', subtitle: `Спринт ${sprint.name}`,
            data,
    }
}