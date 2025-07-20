export interface Itour{
    id?: string;
    name: string;
    slug: string;
    images?: string[];
    thumbnail?: string;
    location?: string;
    costFrom?: number;
    costTo?: number;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    isActive?: boolean;
}