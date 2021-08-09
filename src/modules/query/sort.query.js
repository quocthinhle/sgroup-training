import { sortDirection } from "./enum/sort-directions";

export class SortQuery {
	static SEPERATOR = "-";

	transform(sortType) {
		if (sortType.indexOf("none") >= 0) return null;

		const sort = {};
		const infor = sortType.split(SortQuery.SEPERATOR);

		sort.field = infor[0];
		sort.direction = sortDirection[infor[1]];

		return sort;
	}

	queryStatement(sort) {
		return `ORDER BY ${sort.field} ${sort.direction}`;
	}
}