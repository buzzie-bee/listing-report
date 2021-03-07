export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col justify-center w-full mx-auto"
      data-testid="todo-table"
    >
      <div className="-my-2 ">
        <div className="py-2 px-2 sm:px-6 lg:px-8 w-full">
          <div className="shadow border-b border-gray-200 sm:rounded-lg">
            <table className="table-auto min-w-full divide-y divide-gray-200">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
