import VueRouter3 from "vue-router-3";
import * as VueRouter4 from "vue-router-4";
import { createRoutes } from "./routes.mjs";
import v8Profiler from "v8-profiler-next";
import fs from "fs";

const profileName = "router-profile";
const iterations = 100;
const multiplierArray = [1, 10, 50, 100, 200];
const results = {
  RouterV3: {},
  RouterV4: {},
  RouterV4Cached: {},
};

if (process.env.PROFILER) {
  console.log("Will generate cpu profile!");
  v8Profiler.setGenerateType(1);
  v8Profiler.startProfiling(profileName, true);
}

const cache = {
  RouterV3: {},
  RouterV4: {},
  RouterV4Cached: {},
};

for (const multiplier of multiplierArray) {
  const routes = createRoutes(multiplier);
  console.log(
    `Running ${iterations} router creations with ${routes.length} routes...`
  );

  const v3 = performance.now();
  for (let i = 0; i < iterations; i++) {
    new VueRouter3({
      routes,
    });
  }
  results.RouterV3[routes.length] = (performance.now() - v3).toFixed(2) + "ms";

  const v4 = performance.now();
  for (let i = 0; i < iterations; i++) {
    VueRouter4.createRouter({
      history: VueRouter4.createMemoryHistory(),
      routes,
    });
  }
  results.RouterV4[routes.length] = (performance.now() - v4).toFixed(2) + "ms";

  const precompiledRouter = VueRouter4.createRouter({
    history: VueRouter4.createMemoryHistory(),
    routes,
    sortCache: cache.RouterV4Cached[multiplier],
  });
  cache.RouterV4Cached[multiplier] ??= VueRouter4.createRouterMatcherSortCache(
    precompiledRouter.getRoutes()
  );

  const v4Cached = performance.now();
  for (let i = 0; i < iterations; i++) {
    VueRouter4.createRouter({
      history: VueRouter4.createMemoryHistory(),
      routes,
      sortCache: cache.RouterV4Cached[multiplier],
    });
  }
  results.RouterV4Cached[routes.length] =
    (performance.now() - v4Cached).toFixed(2) + "ms";
}

console.table(results);

if (process.env.PROFILER) {
  const profile = v8Profiler.stopProfiling(profileName);
  profile.export(function (error, result) {
    fs.writeFileSync(`${profileName}.cpuprofile`, result);
    profile.delete();
  });
}
