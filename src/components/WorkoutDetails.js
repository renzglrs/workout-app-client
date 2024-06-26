import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const resposne = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/workouts/${workout._id}`, {
      method: "DELETE"
    });
    const json = await resposne.json();

    if(resposne.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  }

  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{ formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true} ) }</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails;