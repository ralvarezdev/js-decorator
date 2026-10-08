# js-decorator

Higher-order function helpers for JavaScript projects to build method decorators and attach or read metadata on class methods.

**Note:** This repository is archived and read-only.

Package `@ralvarezdev/js-decorator` (0.2.3, ES modules, no dependencies).

## Installation

npm publication was not verified; installing from GitHub works regardless:

```bash
npm install github:ralvarezdev/js-decorator
```

## API

Exported from `index.js`. Decorators are applied by calling them with `(target, property)`, where `target` is a class (its `prototype` must exist) and `property` the name of a prototype method.

- **`NewDecorator(decoratorFn)`** — returns `(target, property) => ...` that resolves the prototype method and calls `decoratorFn(target, property, prototypeMethod)`.
- **`AddMetadata(key, value)`** — returns a decorator that stores `value` under `key` in the method's `metadata` object. Throws if the key is empty or already set.
- **`GetMetadata(target, property)`** — the whole metadata object of the method.
- **`GetMetadataKeys(target, property, ...keys)`** — an object with the requested keys; throws if metadata or any key is missing.
- **`GetMetadataKey(target, property, key)`** — the value of one key.

## Example

```js
import { AddMetadata, GetMetadataKey } from "@ralvarezdev/js-decorator";

class UserController {
  list() {}
}

AddMetadata("route", "/users")(UserController, "list");

GetMetadataKey(UserController, "list", "route"); // "/users"
```

## Project structure

```
index.js
decorator/decorator.js   implementation
decorator/index.js
```

There are no tests.

## License

The repository has a GNU General Public License v3.0 `LICENSE` file, but `package.json` declares `ISC`; the two disagree.
