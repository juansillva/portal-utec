
import iconTeacher from '../../assets/Teacher.svg'
import Calendar from '../../assets/Calendar.png'


type Tag = {
  label: string;
  color: string;
  icon: string;
};

type CardProps = {
    title: string,
    professor: string,
    days: string,
    time: string,
    tag: Tag
}
 
const CardCursos = ({title, professor, days, time, tag}:CardProps) => {

  return (
    <div className="container-cards">
     <div className="card-curse">
     <div className={`tag ${tag.color}`} >{tag.label}</div>
     <img className="course-icon" src={tag.icon} alt="Ícone do Curso" />
     <div className="course-info">
    <h3 id="title">{title}</h3>
    <span className="content-info">
        <img src={iconTeacher} alt="" />
        <p>Prof. {professor} </p>
    </span>
       <span className="content-info">
        <img src={Calendar} alt="" />
        <p>{days} - {time}</p>
       </span>
     </div>
    </div>
    </div>

   
  )
}

export default CardCursos