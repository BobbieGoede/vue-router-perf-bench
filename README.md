### How to run

* `pnpm install`
* `pnpm start` - Runs router creations and logs result
* `pnpm start:profiler` - Runs router creations and logs result and also generates cpu profile


### Results on local machine

| version/routes| 11       | 110      | 550      | 1100      | 2200      |
|---------------|----------|----------|----------|-----------|-----------|
| RouterV3      | 5.92ms   | 21.88ms  | 99.48ms  | 199.91ms  | 405.28ms  |
| RouterV4      | 10.17ms  | 42.00ms  | 595.52ms | 2423.61ms | 9639.21ms |
| RouterV4Cached| 5.26ms   | 30.03ms  | 137.83ms | 286.43ms  | 571.68ms  |
