import { CalendarDays, Clock, User } from "lucide-react";
import { Fade } from "react-awesome-reveal";

type Tag = {
  label: string;
  color: string;
  icon: string;
};

type CardProps = {
  title: string;
  professor: string;
  days: string;
  time: string;
  tag: Tag;
};

const CardCourse = ({ title, professor, days, time, tag }: CardProps) => {
  return (
    <Fade triggerOnce direction="left">
      <div className="card-curse">
        <div className="tag" style={{ backgroundColor: tag.color }}>
          {tag.label}
        </div>
        <img className="course-icon" src={tag.icon} alt="Ícone do Curso" />
        <div className="course-info">
          <h3 id="title">{title}</h3>
          
          <div className="box-content-info">
            <span className="content-info">
              <User />
              <p>Prof. {professor}</p>
            </span>
            <span className="content-info">
              <p id="days">
               <CalendarDays />{days}
              </p>
            </span>
            <span className="content-info">
                <Clock/> <p>{time}</p>
            </span>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default CardCourse;
