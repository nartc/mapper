const path = require('path');
const { parentPort, workerData } = require('worker_threads');
const { _map, _mapArray } = require(path.resolve(__dirname, './base'));
const { _toArrayBuffer, _toString } = require(path.resolve(
  __dirname,
  './utils/common.utils'
));

const { sourceObj, mapping, options, mappings, isMapArray } = JSON.parse(
  _toString(workerData)
);

if (parentPort) {
  if (isMapArray) {
    parentPort.postMessage(
      _toArrayBuffer(
        JSON.stringify(_mapArray(sourceObj, mapping, options, mappings))
      )
    );
  } else {
    parentPort.postMessage(
      _toArrayBuffer(
        JSON.stringify(_map(sourceObj, mapping, options, false, mappings))
      )
    );
  }
}
