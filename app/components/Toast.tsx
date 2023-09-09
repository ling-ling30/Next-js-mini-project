type Props = {
  message: string;
};
export default function Toast({ message }: Props) {
  return (
    <div
      onClick={() => {
        console.log(`clicked`);
      }}
      className="toast toast-top toast-center"
    >
      <div className="alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
}
