import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Campaign from "../components/Campaign";
import { fetchCampaign } from "../actions/mail.action";

const MyCampaignScreen = () => {
  const [campaign, setcampaign] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    (async () => {
      const { accessToken } = auth;
      const res = await fetchCampaign(accessToken);
      setcampaign(res.data.mails);
    })();
  }, [auth]);
  return (
    <div>
      {campaign &&
        campaign.map((c) => {
          const { body, cc, howManyTime, startTime, subject, to, _id } = c;
          return (
            <Campaign
              key={_id}
              body={body}
              cc={cc}
              howManyTime={howManyTime}
              startTime={startTime}
              subject={subject}
              to={to}
            />
          );
        })}
    </div>
  );
};

export default MyCampaignScreen;
