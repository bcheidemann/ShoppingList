import { MAX_LIST_NAME_LEN, MIN_LIST_NAME_LEN } from './consts';

export function validate_list_name(str: string) {
	return str.length >= MIN_LIST_NAME_LEN && str.length <= MAX_LIST_NAME_LEN;
}
