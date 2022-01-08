import { Process } from './processGoals.models'

export interface Performance {
    id: string;
    dueDate: Date;
    description: string;
    percentImproved: number;
    reward: string;
    punishment: string;
    completed: Boolean;
    processGoals: Process[];
}