import "./User.css";

interface UserProps {
  image: string;
  name: string;
  isSelected: boolean;
  onSelect?: () => void;
}

function User({ image, name, isSelected = false, onSelect = () => {} }: UserProps) {
  return (
    <div>
      <button onClick={onSelect} className={isSelected ? 'active' : ''}>
        <img src={image} alt={name} />
        <span>{name}</span>
      </button>
    </div>
  );
}

export default User;
