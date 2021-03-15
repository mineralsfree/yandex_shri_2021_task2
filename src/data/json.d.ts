import {Entity} from "../types";

declare module '*.json'{
    const value: Entity[];
    export default value;
}