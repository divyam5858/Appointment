import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    hospital: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    interviewDate: { type: String, required: true },
    interviewTime: { type: String, required: true },
    mode: { type: String, default: "Walk-In Interview" },
    requirements: { type: String, required: true },
    salary: { type: String, required: true }
  },
  { timestamps: true }
);

const jobModel =
  mongoose.models.job || mongoose.model("job", jobSchema);

export default jobModel;