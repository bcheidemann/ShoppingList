/* eslint-disable @typescript-eslint/no-namespace */

namespace Key {
	export enum JSON {
		YOUR_LISTS = 'YOUR_LISTS'
	}

	export type Any = typeof JSON;
}

export namespace LocalStorage {
	export type Key = Key.Any;

	export type Item = {
		[Key.JSON.YOUR_LISTS]: Array<string>;
	};
}

type Item = LocalStorage.Item;

export class LocalStorage {
	static Key = Key;

	static getItemJson<T extends Key.JSON>(key: T, _default?: Item[T]): Item[T] {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : typeof item === 'undefined' ? item : _default;
	}

	static setItemJson<T extends Key.JSON>(key: T, value: Item[T]) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static removeItem(key: keyof Key.Any) {
		localStorage.removeItem(key);
	}
}
