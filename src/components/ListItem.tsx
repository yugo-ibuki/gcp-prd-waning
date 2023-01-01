import { button, deleteButton, ProjectNameFrame } from "~src/css/form";

type ListItemProps = {
  name: string;
  onDeleteProjectName: (projectName: string) => void
}

export const ListItem = ({ name, onDeleteProjectName }: ListItemProps) => {
  return (
    <div style={ProjectNameFrame}>
      <p>{name}</p>
      <button
        style={deleteButton}
        data-project-name={name}
        onClick={(e) => onDeleteProjectName(e.currentTarget.dataset.projectName)}
      >
        delete
      </button>
    </div>
  )
}