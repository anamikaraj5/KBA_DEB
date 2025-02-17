import { Schema, model } from "mongoose";

const demo2 = new Schema({
  screen_no: { type: Number, required: true },
  seats: {
    Platinum: { type: Number, required: true },
    Gold: { type: Number, required: true },
    Diamond: { type: Number, required: true },
  },
});

const multiplex = model("multiplex", demo2);

export { multiplex };
