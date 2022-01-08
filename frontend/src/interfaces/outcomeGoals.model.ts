import { Performance } from './performanceGoals.model';

export interface Outcome {
    id: string;
    description: string;
    dateDue: Date;
    complete: Boolean;
    reward: string;
    punishment: string;
    performanceGoals: Performance[];
}