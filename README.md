### How to run

- `pnpm install`
- `pnpm start` - Runs router creations and logs result
- `pnpm start:profiler` - Runs router creations and logs result and also generates cpu profile

### Results on local machine

These test results show the time it takes to create a router 100 times with different amounts of routes (11, 110, 550, 1100, 2200) per Vue Router version. The results show that performance scales differently between Router version 3 and 4 and diverge as the amount of routes goes up.

The `RouterV4Cached` results are based on router creations while using a pre-calculated sort cache, more information on that here: https://github.com/vuejs/router/pull/2136

| version/routes | 11      | 110     | 550      | 1100      | 2200      |
| -------------- | ------- | ------- | -------- | --------- | --------- |
| RouterV3       | 5.88ms  | 21.90ms | 100.11ms | 200.38ms  | 405.75ms  |
| RouterV4       | 10.72ms | 40.35ms | 601.14ms | 2386.12ms | 9649.10ms |
| RouterV4Cached | 5.26ms  | 32.52ms | 141.46ms | 275.60ms  | 553.46ms  |
