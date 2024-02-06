import VueRouter3 from "vue-router-3";
import * as VueRouter4 from "vue-router-4";
import { routes } from "./routes.mjs";

const iterationsArray = [10, 100, 200, 400, 1000];
const results = {
  RouterV3: {},
  RouterV4: {},
};

for (const iterations of iterationsArray) {
  console.log(`Running ${iterations} creations (for both versions)...`);

  const v3 = performance.now();
  for (let i = 0; i < iterations; i++) {
    new VueRouter3({
      routes,
    });
  }
  results.RouterV3[iterations] = (performance.now() - v3).toFixed(2) + "ms";

  const v4 = performance.now();
  for (let i = 0; i < iterations; i++) {
    VueRouter4.createRouter({
      history: VueRouter4.createMemoryHistory(),
      routes,
    });
  }

  results.RouterV4[iterations] = (performance.now() - v4).toFixed(2) + "ms";
}

console.clear();
console.table(results);
