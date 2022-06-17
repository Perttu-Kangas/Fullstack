const Course = (props) => {
  return (
    <div>
      {props.courses.map((course) => (
        <SingleCourse key={course.id} course={course} />
      ))}
    </div>
  );
};

const SingleCourse = (props) => {
  return (
    <>
      <Header header={props.course.name} />
      <Content course={props.course} />
      <Total course={props.course} />
    </>
  );
};

const Header = ({ header }) => {
  return <h1>{header}</h1>;
};

const Content = (props) => {
  console.log(props);
  return (
    <>
      {props.course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <p>
      <b>
        total of{" "}
        {props.course.parts.reduce((s, p) => {
          return s + p.exercises;
        }, 0)}{" "}
        exercises
      </b>
    </p>
  );
};

export default Course;
