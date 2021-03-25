import {Entity} from "../types/types";

declare module '*.json'{
    const value: Entity[];
    export default value;
}