import { ILocationKeralaRescue } from 'app/shared/model//location-kerala-rescue.model';
import { IRequirementKeralaRescue } from 'app/shared/model//requirement-kerala-rescue.model';

export interface ICampKeralaRescue {
    id?: number;
    name?: string;
    phone?: string;
    location?: ILocationKeralaRescue;
    items?: IRequirementKeralaRescue[];
}

export class CampKeralaRescue implements ICampKeralaRescue {
    constructor(
        public id?: number,
        public name?: string,
        public phone?: string,
        public location?: ILocationKeralaRescue,
        public items?: IRequirementKeralaRescue[]
    ) {}
}
