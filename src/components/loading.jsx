import '../styles/loading.css';

export default function Loading() {
  return (
    <div className={"container"}>
      <svg viewBox="25 25 50 50">
        <circle className={"circle"} cx="50" cy="50" r="20"></circle>
      </svg>
    </div>
  );
}