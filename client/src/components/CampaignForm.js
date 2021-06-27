import React from "react";

const CampaignForm = (props) => {
  const {
    to,
    setTo,
    cc,
    setcc,
    subject,
    setsubject,
    body,
    setbody,
    howMany,
    sethowMany,
    startTime,
    setstartTime,
    handleSubmit,
    scheduleType,
    selectedScheduleType,
    setselectedScheduleType,
    time,
    settime,
    day,
    setday,
    date,
    setdate,
    second,
    setsecond,
    month,
    setmonth,
  } = props;
  return (
    <div>
      <h1>Campaign Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="to">
            To
          </label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            type="email"
            id="to"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="cc">
            CC
          </label>
          <input
            value={cc}
            className="form-control"
            onChange={(e) => setcc(e.target.value)}
            type="email"
            id="cc"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="subject">
            Subject
          </label>
          <input
            className="form-control"
            value={subject}
            onChange={(e) => setsubject(e.target.value)}
            type="text"
            id="subject"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select Schedule Type</label>
          <select
            className="form-select"
            onChange={(e) => {
              scheduleType.forEach((s) => {
                const { _id } = s;
                if (_id === e.target.value) {
                  setselectedScheduleType(s);
                }
              });
            }}
          >
            {scheduleType &&
              scheduleType.map((s) => {
                const { _id, name } = s;
                return (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mb-3">
          {selectedScheduleType.second && (
            <>
              <label className="form-label">Seconds (1 - 59)</label>
              <input
                className="form-control"
                value={second}
                onChange={(e) => setsecond(e.target.value)}
                type="number"
                min={1}
                max={59}
              />
            </>
          )}
          {selectedScheduleType.day && (
            <>
              <label className="form-label">
                Day (0(sunday) - 6(saturday))
              </label>

              <input
                className="form-control"
                value={day}
                onChange={(e) => setday(e.target.value)}
                type="number"
                min={0}
                max={6}
              />
            </>
          )}
          {selectedScheduleType.date && (
            <>
              <label className="form-label">Date (1 - 31)</label>
              <input
                className="form-control"
                value={date}
                onChange={(e) => setdate(e.target.value)}
                type="number"
                min={1}
                max={31}
              />
            </>
          )}
          {selectedScheduleType.time && (
            <>
              <label className="form-label">Select Time</label>
              <input
                className="form-control"
                value={time}
                onChange={(e) => settime(e.target.value)}
                type="time"
              />
            </>
          )}
          {selectedScheduleType.month && (
            <>
              <label className="form-label">Month (1 - 12)</label>

              <input
                className="form-control"
                value={month}
                onChange={(e) => setmonth(e.target.value)}
                type="number"
                min={1}
                max={12}
              />
            </>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="body">
            Body
          </label>
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setbody(e.target.value)}
            id="body"
            rows="5"
            cols="10"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="howMany">
            How many emails do you want to send ?
          </label>
          <input
            className="form-control"
            value={howMany}
            onChange={(e) => sethowMany(e.target.value)}
            type="number"
            id="howMany"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="startTime">
            Start Time
          </label>
          <input
            className="form-control"
            value={startTime}
            onChange={(e) => setstartTime(e.target.value)}
            type="datetime-local"
            id="startTime"
          />
        </div>
        <button className="btn btn-primary mb-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
