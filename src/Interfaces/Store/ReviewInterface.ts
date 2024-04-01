import { Date } from "mongoose";

interface ReviewsInterface {
  msg: String;
  createAt: Date;
  punctuation: number;
}
export default ReviewsInterface;
