import { parentPort, workerData } from 'worker_threads';
import { _map, _mapArray } from './base';
import { _toArrayBuffer, _toString } from './utils/common.utils';

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
