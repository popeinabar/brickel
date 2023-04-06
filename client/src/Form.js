import React from 'react'
import { useEffect, useState } from 'react'
function Form() {
  const [workouts, setWorkouts] = useState(null);
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workout');
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };
    fetchWorkouts();
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    const response = await fetch('/api/workout', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      console.log('new workout added');
      const response = await fetch('/api/workout');
      const json = await response.json();
      if (response.ok) {
        setWorkouts(json);
      }
    }
  };

  return (
    <>
      <div>
        <div className='output'>
          {workouts &&
            workouts.map((workout) => (
              <div key={workout._id}>
                <p>{workout.title}</p>
                <p>
                  <strong>Load:</strong>
                  {workout.load}
                </p>
                <p>
                  <strong>reps</strong>
                  {workout.reps}
                </p>
                <p>{workout.createdAt}</p>
              </div>
            ))}
        </div>

        <form onSubmit={handleSumbit}>
          <h4>Add workout</h4>

          <label>Excersize</label>
          <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} />
          <label>load</label>
          <input type='number' onChange={(e) => setLoad(e.target.value)} value={load} />
          <label>reps</label>
          <input type='number' onChange={(e) => setReps(e.target.value)} value={reps} />
          <button>Add workout</button>
          {error && <div className='error'>{error}</div>}
        </form>
      </div>
    </>
  );
}


export default Form
