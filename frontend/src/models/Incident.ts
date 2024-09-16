import { Category } from "./Category";

export type Incident = {
	id: string;
	title: string;
	content: string;
	categoryId: string;
	category: Category;
	latitude: number;
	longitude: number;
}