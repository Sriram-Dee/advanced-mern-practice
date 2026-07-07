import CounterModel from "../models/CounterSchema.js";

export const getNextSequence = async (counterName) => {
  const counter = await CounterModel.findByIdAndUpdate(
    counterName,
    {
      $inc: { sequence: 1 },
    },
    {
      returnDocumente: "after",
      upsert: true,
    },
  );

  return counter.sequence;
};
