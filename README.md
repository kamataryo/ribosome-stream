# RibosomeStream

RNA base sequence translation stream.

## Usage

```shell
$ cat /dev/urandom | base64 | tr -dc 'AUGC' | npx ribosome-stream
```

```typescript
import RibosomeStream from "ribosome-stream";

stream.pipe(new RibosomeStream()).pipe(process.stdout);
```
