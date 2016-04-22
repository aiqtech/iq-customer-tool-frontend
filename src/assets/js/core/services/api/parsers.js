import { normalize, arrayOf } from 'normalizr';

const stdParser = (schema, data, options) => {
  if(_.isArray(data)) {
    return normalize(data, arrayOf(schema));
  }

  return normalize(data, schema);
};

const triggerParser = (schema, data, options) => {
  const parsePayload = (item) => {
    const newPayload = [];
    _.each(item.payload, (payload, index) => {
      newPayload.push({
        triggerPayloadId: _.uniqueId(),
        triggerId: item.triggerId,
        index
      });
    });

    item.payload = newPayload;
  };


  if(_.isArray(data)) {
    _.each(data, parsePayload);
  } else {
    parsePayload(data);
  }

  return stdParser(schema, data);
};

const trainingResultsParser = (schema, data, options) => {
  _.each(data, (item, index) => {
    item.trainingResultId = _.uniqueId();
    item.triggerId = options.triggerId;
    item.frame = index;
  });

  return stdParser(schema, data);
};

export default stdParser;
export { triggerParser };
export { trainingResultsParser };
