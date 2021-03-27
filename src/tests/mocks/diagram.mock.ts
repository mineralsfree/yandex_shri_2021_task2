import {Sprint} from "../../types/types";

export const previousSprint: Sprint = {
    "id": 969,
    "type": "Sprint",
    "name": "Тополиный пух",
    "startAt": 1598735102000,
    "finishAt": 1599339902000
}
export const defaultOutput = {
    "title": "Размер коммитов",
    "subtitle": "Спринт Жара",
    "totalText": "354 коммита",
    "differenceText": "-301 с прошлого спринта",
    "categories": [{
        "title": "> 1001 строки",
        "valueText": "266 коммитов",
        "differenceText": "-220 коммитов"
    }, {
        "title": "501 — 1000 строк",
        "valueText": "65 коммитов",
        "differenceText": "-68 коммитов"
    }, {
        "title": "101 — 500 строк",
        "valueText": "8 коммитов",
        "differenceText": "-9 коммитов"
    }, {"title": "1 — 100 строк", "valueText": "15 коммитов", "differenceText": "-4 коммита"}]
}