import { Gift } from "./gift.model";

export interface KarmaPoint {
    id?: string;
    good: number;
    bad: number;
    Gift: Array<Gift>;
}
