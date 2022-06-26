/**
 * 类型联系
 * */
/** 1 *********************************************************************************/
interface Todo {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
}

// - 减号可以去掉修饰符
type Mutable<T extends Record<string, any>> = {
  -readonly [K in keyof T]: T[K];
};

type MutableTodo = Mutable<Todo>;

/** 2 *********************************************************************************/
interface User {
  name: string;
  age?: number;
  address?: string;
}

/**
 * 这里的as属实没看懂
 * */
type RequiredByKeys<T extends Record<string, any>, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]-?: T[K];
} &
  {
    [P in Exclude<keyof T, K>]?: T[P];
  };

type UserPartialName = RequiredByKeys<User, 'name'>; // { name: string; age?: number; address?: string }

/** 3 *********************************************************************************/
interface User1 {
  name: string;
  age: number;
  address: string;
}

type PartialByKeys<T extends Record<string, any>, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]?: T[K];
} &
  {
    [P in Exclude<keyof T, K>]: T[P];
  };

type UserPartialName1 = PartialByKeys<User1, 'name'>; // { name?:string; age:number; address:string }

/** 4 *********************************************************************************/
// 看看是否U在T的最后面
type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false;

type boo = EndsWith<'111', '1111'>;

/** 5 *********************************************************************************/
type StartsWith<T extends string, U extends string> = T extends `${U}${string}` ? true : false;

type a = StartsWith<'abc', 'ac'>; // expected to be false
type b = StartsWith<'abc', 'ab'>; // expected to be true
type c = StartsWith<'abc', 'abcd'>; // expected to be false

/** 6 *********************************************************************************/
type PickByType<T extends Record<string, any>, U extends any> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

type OnlyBoolean = PickByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { isReadonly: boolean; isEnable: boolean; }

/** 7 *********************************************************************************/
type EqualType<T, R> = T extends R ? (R extends T ? true : false) : false;
type DropChar<S extends string, C extends string> = S extends `${infer L}${infer R}`
  ? `${EqualType<L, C> extends true ? '' : L}${DropChar<R, C>}`
  : '';

type Butterfly = DropChar<' b sss是  是    是', ' '>; // 'butterfly!'

/** 8 *********************************************************************************/
type Foo = {
  [key: string]: any;
  foo(): void;
  a: string;
};

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

type A = RemoveIndexSignature<Foo>; // expected { foo(): void }

/** 9 *********************************************************************************/
