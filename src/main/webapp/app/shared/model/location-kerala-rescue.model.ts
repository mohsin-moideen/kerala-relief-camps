export interface ILocationKeralaRescue {
    id?: number;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    mapLocation?: string;
}

export class LocationKeralaRescue implements ILocationKeralaRescue {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public mapLocation?: string
    ) {}
}
