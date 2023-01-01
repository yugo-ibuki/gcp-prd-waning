import { useForm } from "~src/hooks/useForm";
import {
  allDeleteButton,
  button,
  error,
  flex,
  frame,
  input,
} from "~src/css/form";
import { ListItem } from "~src/components/ListItem";

function IndexPopup() {
  const {
    projectName,
    projectNames,
    onRegister,
    onInputProjectName,
    onDeleteProjectName,
    onAllDelete,
    err
  } = useForm()
  return (
    <div style={frame}>
      <h1>!!! Warning GCP PROD !!!</h1>
      <div style={flex}>
        <input
          style={input}
          type="text"
          placeholder={"input your prd project name"}
          value={projectName}
          onChange={(e) => onInputProjectName(e.target.value)}
        />
        <button style={button} onClick={onRegister}>
          Submit
        </button>
        <button style={allDeleteButton} onClick={onAllDelete}>
          All Delete
        </button>
      </div>
      { err && <div style={error}>{err}</div> }
      {
        projectNames &&
        projectNames.map((name) => (
            <ListItem
              key={name}
              name={name}
              onDeleteProjectName={onDeleteProjectName}
            />)
        )
      }
    </div>
  )
}

export default IndexPopup
