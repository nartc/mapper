---
id: extend-plugin
title: Extend plugin
sidebar_label: Extend plugin
---

In addition to [creating your own plugins](create-plugin.md), you can also **extend existing plugins**. After all, plugins are just `Object`.

The following example shows how to extend `@automapper/classes` to convert all `null` values to `undefined` by customizing `preMap()` and `preMapArray()` on `classes` plugin.

```ts
const customClasses = (errorHandler: ErrorHandler) => {
  // simple function to check for null and reassign to undefined
  function nullify(srcObj: Record<string, unknown>) {
    for (const srcKey in srcObj) {
      if (srcObj[srcKey] === null) {
        srcObj[srcKey] = undefined;
      }

      if (
        typeof srcObj[srcKey] === 'object' &&
        !Array.isArray(srcObj[srcKey])
      ) {
        nullify(srcObj[srcKey] as Record<string, unknown>);
      }
    }
  }

  // call the original pluginInitializer
  const originalClasses = classes(errorHandler);

  // grab the original preMap
  const originalPreMap = originalClasses.preMap;

  // customize the preMap
  originalClasses.preMap = (...args) => {
    const originalPreMapResult = originalPreMap(...args);
    nullify(originalPreMapResult[0]);
    return originalPreMapResult;
  };

  // add a custom preMapArray
  originalClasses.preMapArray = (source, sourceArr) => {
    return sourceArr.map((srcItem) => {
      nullify(srcItem);
      return srcItem;
    });
  };

  // return the plugin object
  return originalClasses;
};
```

With this in place, we can use it like any other plugin.

```ts
const mapper = createMapper({
  name: 'customClasses',
  pluginInitializer: customClasses,
});
```
