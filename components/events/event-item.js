import Image from 'next/image'

import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

import classes from "./event-item.module.css";
// classes is an object of styles

const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  const readableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n"); //replaces common with a line break (\n) - styling is required for this to work as intended
  const exploreLink = `events/${id}`;

  return (
    <li className={classes.item}>
      {/* next looks for static content in the public folder - allows us to look for src url as if we're already inside the public folder */}
      {/* Next Image will generate an optimized lazy loading image (based on browser and device) when request is made and cache that image to be used for requests from similar devices */}
      {/* consider largest dimension the image will be displayed, by default next will scale down the dimensions for smaller viewports. when image looks blurry increase the dimensions. these dimensions only determine the image size REQUESTED. CSS applied to images still apply */}
      <Image src={"/" + image} alt={title} width={250} height={160}/>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
