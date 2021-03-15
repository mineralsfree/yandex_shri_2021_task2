import * as data from "./data/input.json";
function prepareData(entities, _a) {
    var sprintId = _a.sprintId;
    console.log(data);
    if (sprintId === 0)
        console.log('lol');
    return [{ alias: "activity", data: { title: '', subtitle: '', data: {
                    mon: [],
                    tue: [],
                    wed: [],
                    thu: [],
                    fri: [],
                    sat: [],
                    sun: []
                }
            } }];
}
var storyData = prepareData(data, { sprintId: 1 });
console.log(storyData);
//# sourceMappingURL=index.js.map