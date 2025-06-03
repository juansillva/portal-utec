import { CalendarDays } from "lucide-react";

type CardClubProps = {
  school: string;
  image: string;
  title: string;
  day: string;
  time: string;
};

const CardClub = ({ school, image, title, day, time }: CardClubProps) => {
  return (
      <div className="card-club">
        <span id="school">{school}</span>
        <img id="club-icon" src={image} alt="" />
        <p>{title}</p>
        <span className="club-info">
          <CalendarDays />
          <p id="days">
            {day} - {time}
          </p>
        </span>
      </div>
  );
};

export default CardClub;
