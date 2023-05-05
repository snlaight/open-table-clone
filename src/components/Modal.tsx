/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

type TModalProps = {
  headerText: string;
  modalBody: React.ReactNode;
  footerChildren: React.ReactNode;
  handleClose: () => void;
}

const Modal = ({ headerText, modalBody, footerChildren, handleClose }: TModalProps) => (
  <>
    <div className='flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center outline-none focus:outline-none'>

      <div className='relative w-[400px] my-6 mx-auto max-w-3xl'>
        <div className='flex relative flex-col w-full bg-white border-0 shadow-lg outline-none focus:outline-none'>
          <span className='flex justify-end text-sm cursor-pointer' onClick={handleClose}>
            close
          </span>
          <div className='flex justify-center items-center p-6 pb-2 mb-2 font-bold uppercase border-b'>
            <h3 className='text-lg'>
              {headerText}
            </h3>
          </div>
          <div className='relative flex-auto p-6'>
            <p className='leading-relaxed text-center text-slate-500 text-md'>
              {modalBody}
            </p>
          </div>
          <div className='flex gap-8 justify-center items-center p-6 rounded-b'>
            <span className='w-full cursor-pointer text-primary-500'>
              {footerChildren}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className='fixed inset-0 z-40 bg-black opacity-25' />
  </>

);

export default Modal;
