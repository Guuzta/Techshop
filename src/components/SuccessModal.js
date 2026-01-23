export default function SuccessModal({
  closeModal,
  title,
  message,
  handleRedirect,
  showConfirmButton,
  showDenyButton,
}) {
  return (
    <el-dialog>
      <dialog
        open
        aria-labelledby="dialog-title"
        className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
      >
        <el-dialog-backdrop className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

        <div
          tabIndex="0"
          className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
        >
          <el-dialog-panel className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="!m-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-500/10 sm:size-16">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    id="dialog-title"
                    className="text-base sm:text-xl mt-4 text-center font-semibold text-white "
                  >
                    {title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400 text-center">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-700/25 px-3 py-3  justify-center space-between">
              {showConfirmButton && (
                <button
                  type="button"
                  onClick={handleRedirect ? handleRedirect : closeModal}
                  className="my-1 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-400 "
                >
                  Confirmar
                </button>
              )}

              {showDenyButton && (
                <button
                  type="button"
                  onClick={closeModal}
                  className="my-1 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 "
                >
                  Fechar
                </button>
              )}
            </div>
          </el-dialog-panel>
        </div>
      </dialog>
    </el-dialog>
  );
}
