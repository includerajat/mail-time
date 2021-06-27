import React, { useState, useEffect } from "react";
import { loadSchedules, createCampaign } from "../actions/mail.action";
import { useSelector } from "react-redux";
import CampaignForm from "../components/CampaignForm";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const CreateCampaignScreen = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState("");
  const [cc, setcc] = useState("");
  const [subject, setsubject] = useState("");
  const [body, setbody] = useState("");
  const [howMany, sethowMany] = useState(0);
  const [startTime, setstartTime] = useState("");
  const [scheduleType, setScheduleType] = useState([]);
  const [selectedScheduleType, setselectedScheduleType] = useState({});
  const [time, settime] = useState("00:00");
  const [day, setday] = useState(0);
  const [date, setdate] = useState(0);
  const [month, setmonth] = useState(0);
  const [second, setsecond] = useState(0);

  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await loadSchedules();
      setScheduleType(res.data);
      setselectedScheduleType(res.data[0]);
    })();
  }, []);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const data = {
        to,
        cc,
        subject,
        body,
        howManyTime: parseInt(howMany),
        startTime: new Date(startTime).toISOString(),
        schedule: {
          id: selectedScheduleType._id,
          time,
          second,
          day,
          month,
          date,
        },
      };
      console.log(data);
      const { accessToken } = auth;
      const res = await createCampaign(data, accessToken);
      setLoading(false);
      history.push("/myCampaign");
      console.log(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(
        error.response &&
          error.response.data &&
          error.response.data.error.message
      );
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <CampaignForm
            to={to}
            setTo={setTo}
            cc={cc}
            setcc={setcc}
            subject={subject}
            setsubject={setsubject}
            body={body}
            setbody={setbody}
            howMany={howMany}
            sethowMany={sethowMany}
            startTime={startTime}
            setstartTime={setstartTime}
            handleSubmit={handleSubmit}
            scheduleType={scheduleType}
            setScheduleType={setScheduleType}
            selectedScheduleType={selectedScheduleType}
            setselectedScheduleType={setselectedScheduleType}
            time={time}
            settime={settime}
            day={day}
            setday={setday}
            date={date}
            setdate={setdate}
            second={second}
            setsecond={setsecond}
            month={month}
            setmonth={setmonth}
          />
        </>
      )}
    </div>
  );
};

export default CreateCampaignScreen;
