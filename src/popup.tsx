import { onForm } from "~src/onForm";
import {
  allDeleteButton,
  button,
  deleteButton,
  error,
  flex,
  frame,
  input,
  ProjectNameFrame
} from "~src/css/form";

function IndexPopup() {
  const {
    projectName,
    projectNames,
    onRegister,
    onInputProjectName,
    onDeleteProjectName,
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
          value={projectName}
          onChange={(e) => onInputProjectName(e.target.value)}
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
        projectNames && projectNames.map((name) => (
          <div key={name} style={ProjectNameFrame}>
            <p>{name}</p>
            <button
              style={deleteButton}
              data-project-name={name}
              onClick={(e) => onDeleteProjectName(e.currentTarget.dataset.projectName)}
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
