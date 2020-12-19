import { promisify } from "util";
import * as stream from "stream";

export const pipeline = promisify(stream.pipeline);
