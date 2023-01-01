import { onForm } from "~src/onForm";
import {
  allDeleteButton,
  button,
  deleteButton,
  error,
  flex,
  frame,
  input,
  projectIdFrame
} from "~src/css/form";

function IndexPopup() {
  const {
    projectId,
    projectIds,
    onRegister,
    onInputProjectId,
    onDeleteProjectId,
    onAllDelete,
    err
  } = onForm()
  return (
    <div style={frame}>
      <div style={flex}>
        <input
          style={input}
          type="text"
          placeholder={"input your prd project name"}
          value={projectId}
          onChange={(e) => onInputProjectId(e.target.value)}
        />
        <button style={button} onClick={onRegister}>
          Register
        </button>
        <button style={allDeleteButton} onClick={onAllDelete}>
          All Delete
        </button>
      </div>
      { err && <div style={error}>{err}</div> }
      {
        projectIds && projectIds.map((id) => (
          <div key={id} style={projectIdFrame}>
            <p>{id}</p>
            <button
              style={deleteButton}
              data-project-id={id}
              onClick={(e) => onDeleteProjectId(e.currentTarget.dataset.projectId)}
            >
              delete
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default IndexPopup
