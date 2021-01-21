import React, { useEffect } from "react";

import { sendEvt } from "services/event.service";

import imgFallback from "img/resource_fallback.png";

import styles from "./ResourcesCard.module.scss";

const ResourcesCard = () => {
  const [resources, setResources] = useState([]);
  const [primaryResource, setPrimaryResource] = useState(none);
  const [secondaryResources, setSecondaryResources] = useState([]);

  var sendEventTracking = (resourceUuid) => {
    const evt = new Object();
    evt = {
      event_name: "web_dashboard_card_" + r.id + "_" + r.title + "_tap"
    };
    sendEvt(evt);
    console.log("sending event");
  };

  // TODO
  useEffect(async () => {
    let req = await getResources(userId);
    setResources(req.resources);

    let primaryResource = resources[0];
    let secondaryResources = resources.slice(1, 5);
    setPrimaryResource(primaryResource);
    setSecondaryResources(secondaryResources);
    return;
  });

  // Get image of first resource
  const i = () => {
    const image = primaryResource.icon;
    if (!primaryResource.icon || primaryResource.icon === undefined) {
      return imgFallback;
    }

    if (image === true) {
      return image;
    }
  };

  return (
    <div class={styles.ResourcesCard}>
      <div className="content">
        <h2>{title}</h2>
        <br />
        <br />
        <div id="resource">
          <div id="resource">
            <a
              href={primaryResource.url}
              onClick={sendEventTracking(primaryResource.uuid)}
            >
              <div className="thumbnail">
                <img src={i} alt="primary resource image" />
              </div>
              <span className="topic">{primaryResource.group}</span>
              <h3 className="title" style="color:blue;">
                {primaryResource.title}
              </h3>
            </a>
          </div>
        </div>

        <div className="secondary-resources">
          {secondaryResources.map((resource, index) => (
            <div key={index} className="resource">
              <SecondaryResource {...resource} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesCard;
