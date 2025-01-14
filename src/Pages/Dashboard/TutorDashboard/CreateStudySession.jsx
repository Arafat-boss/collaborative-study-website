import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const CreateStudySession = () => {
  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const sessionData = {
      sessionTitle: form.sessionTitle.value,
      tutorName: form.tutorName.value,
      tutorEmail: form.tutorEmail.value,
      sessionImage: form.sessionImage.files[0], // File input
      registrationStartDate: form.registrationStartDate.value,
      registrationEndDate: form.registrationEndDate.value,
      classStartTime: form.classStartTime.value,
      classEndTime: form.classEndTime.value,
      registrationFee: form.registrationFee.value,
      maxParticipant: form.maxParticipant.value,
      sessionDescription: form.sessionDescription.value,
    };

    console.log(sessionData);
    // Add your API call or other logic here
  };

  return (
    <div className="p-8 bg-blue-50 rounded-lg shadow-lg">
      <SectionTitle header="Create a New Study Session" />
      <form
        onSubmit={handelSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        {/* Session Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Session Title:</span>
          </label>
          <input
            type="text"
            name="sessionTitle"
            placeholder="Session Title..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Tutor Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tutor Name:</span>
          </label>
          <input
            type="text"
            name="tutorName"
            placeholder="Tutor Name..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Tutor Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tutor Email:</span>
          </label>
          <input
            type="email"
            name="tutorEmail"
            placeholder="example@mail.com"
            className="input input-bordered w-full"
          />
        </div>

        {/* Session Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Session Image:</span>
          </label>
          <input
            type="file"
            name="sessionImage"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Registration Start Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Registration Start Date:</span>
          </label>
          <input
            type="date"
            name="registrationStartDate"
            className="input input-bordered w-full"
          />
        </div>

        {/* Registration End Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Registration End Date:</span>
          </label>
          <input
            type="date"
            name="registrationEndDate"
            className="input input-bordered w-full"
          />
        </div>

        {/* Class Start Time */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Start Time:</span>
          </label>
          <input
            type="time"
            name="classStartTime"
            className="input input-bordered w-full"
          />
        </div>

        {/* Class End Time */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class End Time:</span>
          </label>
          <input
            type="time"
            name="classEndTime"
            className="input input-bordered w-full"
          />
        </div>

        {/* Registration Fee */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Registration Fee:</span>
          </label>
          <input
            type="number"
            name="registrationFee"
            placeholder="0"
            className="input input-bordered w-full"
          />
        </div>

        {/* Max Participant */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Max Participant:</span>
          </label>
          <input
            type="number"
            name="maxParticipant"
            placeholder="0"
            className="input input-bordered w-full"
          />
        </div>

        {/* Session Description */}
        <div className="form-control col-span-full">
          <label className="label">
            <span className="label-text">Session Description:</span>
          </label>
          <textarea
            name="sessionDescription"
            placeholder="Session Description..."
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-control col-span-full">
          <button className="btn bg-blue-400 hover:bg-blue-600 w-full text-white">
            Create Study Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudySession;
