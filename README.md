# RibosomeStream

RNA base sequence translation stream.

## Usage

### CLI demo

```shell
$ cat /dev/urandom | base64 | tr -dc 'AUGC' | npx ribosome-stream
```

### As a dependency

```shell
$ yarn add ribosome-stream
```

```typescript
import RibosomeStream from "ribosome-stream";

process.stdin.pipe(new RibosomeStream()).pipe(process.stdout);
```
