export const ErrorBlock = ({ errorMessage }: { errorMessage: string }) => {
  return (
    errorMessage && (
      <div
        className="
          notification
          is-danger
          is-light
          mt-3
          is-align-self-flex-start
        "
        role="alert"
        data-cy="no-suggestions-message"
      >
        <p className="has-text-danger">{errorMessage}</p>
      </div>
    )
  );
};
