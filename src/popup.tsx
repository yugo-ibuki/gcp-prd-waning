import { onForm } from "~src/onForm";
import {
  button,
  deleteButton,
  error,
  flex,
  frame,
  input,
  projectNameFrame,
  projectNameList
} from "~src/css/form";

function IndexPopup() {
  const { projectName, projectNames, onRegister, onInputProjectName, onDeleteProjectName, err } = onForm()
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
      </div>
      { err && <div style={error}>{err}</div> }
      {
        projectNames && projectNames.map((name) => (
          <div key={name} style={projectNameFrame}>
            <p style={projectNameList}>
              {name}
            </p>
            <button
              style={deleteButton}
              data-name={name}
              onClick={(e) => onDeleteProjectName(e.currentTarget.dataset.name)}
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
