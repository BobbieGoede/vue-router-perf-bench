const base = 36;
const routes = [];

// ##########
// edit this instead of PATH_MULTIPLIER in other reproductions
const dirCount = 100;
// ##########

const fileCount = 10;

for (let i = 0; i < dirCount; i++) {
  const dirStr = i.toString(base);
  routes.push({
    name: `${dirStr}`,
    path: `/${dirStr}/`,
    // file: pages['./pages/Home.vue'],
  });

  for (let j = 0; j < fileCount; j++) {
    const fileStr = j.toString(base);
    routes.push({
      name: `${dirStr}-${fileStr}`,
      path: `/${dirStr}/${fileStr}/`,
      // file: pages['./pages/Home.vue'],
    });
  }
}

export { routes };
