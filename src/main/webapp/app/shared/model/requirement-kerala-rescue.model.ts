import { ICampKeralaRescue } from 'app/shared/model//camp-kerala-rescue.model';

export interface IRequirementKeralaRescue {
    id?: number;
    item?: string;
    quantity?: number;
    camp?: ICampKeralaRescue;
}

export class RequirementKeralaRescue implements IRequirementKeralaRescue {
    constructor(public id?: number, public item?: string, public quantity?: number, public camp?: ICampKeralaRescue) {}
}
