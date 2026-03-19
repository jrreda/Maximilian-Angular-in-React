import "./User.css";

interface UserProps {
  image: string;
  name: string;
  isSelected: boolean;
  onSelect?: () => void;
}

function User({
  image,
  name,
  isSelected = false,
  onSelect = () => { },
}: UserProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={isSelected ? "active" : ""}
      aria-pressed={isSelected}
    >
      <img src={image} alt={name} />
      <span>{name}</span>
    </button>
  );
}

export default User;
