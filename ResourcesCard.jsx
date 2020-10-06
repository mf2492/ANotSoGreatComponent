import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { CalloutCard } from "component/cards/CalloutCard";

import { sendEvt } from "services/event.service";

import libraryIcon from "./library.png";
import imgFallback from "./resource_fallback.png";

import { getResources } from "services/resources.service";

import styles from "./ResourcesCard.module.scss";

const ResourcesCard = (userId) => {
  const [resources, setResources] = useState([]);
  const [primaryResource, setPrimaryResource] = useState([]);
  const [secondaryResources, setSecondaryResources] = useState([]);

  var sendEventTracking = function (resource) {
    sendEvt({
      event_name: "web_dashboard_card_tap",
      cardType: resource.type,
      resourceUuid: resource.id
    });
  };

  const markAsRead = () => {
    console.log("article read");
  };

  useEffect(() => {
    sendEvt({
      event_name: "web_dashboard_mavenResourceBlock_view",
      resourceIds: Array.from(
        Object.values(resources),
        (resource) => resource.slug
      )
    });
  });

  useEffect(async () => {
    const req = await getResources(userId);
    setResources(req.resources);
    let primaryResource = resources[0];
    let secondaryResources = resources.slice(1, 5);
    setPrimaryResource(primaryResource);
    setSecondaryResources(secondaryResources);
  }, []);

  return (
    <div className={styles.ResourcesCard}>
      <div className="content">
        <h2 className="serif">{props.title}</h2>

        <div className="resources-container">
          <div className="resource main-resource">
            <a
              href={primaryResource.url}
              onClick={sendEventTracking(primaryResource)}
            >
              <div className="thumbnail">
                <img
                  src={
                    !primaryResource.icon || primaryResource.icon === undefined
                      ? imgFallback
                      : primaryResource.icon
                  }
                  alt="primary image for article"
                />
              </div>
            </a>

            <span className="topic">{primaryResource.group}</span>
            <a
              href={primaryResource.url}
              onClick={sendEventTracking(primaryResource.uuid)}
              className="resource-title serif"
            >
              <h3>{primaryResource.title}</h3>
            </a>
          </div>

          <div className="secondary-resources">
            {secondaryResources.map((resource, index) => (
              <div key={index} className="resource">
                <div className="resource-content">
                  <span className="topic">{resource.group}</span>
                  <a
                    href={resource.url}
                    onClick={sendEventTracking(resource.uuid)}
                    className="resource-title"
                  >
                    <h3>{resource.title}</h3>
                  </a>
                </div>

                <a
                  href={resource.url}
                  onClick={sendEventTracking(resource.uuid)}
                >
                  <div className="thumbnail">
                    <img
                      src={
                        !resource.icon || resource.icon == "None"
                          ? imgFallback
                          : resource.icon
                      }
                      alt="article thumbnail"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CalloutCard
        {...props}
        style="condensed"
        body={props.footer_body}
        cta={{
          text: "Explore the library",
          url: "/library"
        }}
        icon={libraryIcon}
      />
    </div>
  );
};

ResourcesCard.propTypes = {
  footer_body: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ResourcesCard;
