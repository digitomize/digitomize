import "flowbite"

export default function Updates() {
  return (
    <>
      <div className='container m-auto'>
        <h1 className='mx-auto w-full text-center my-2'>Updates</h1>
        <div className='p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
          <time className='text-lg font-semibold text-gray-900 dark:text-white'>
            January 13th, 2022
          </time>
          <ol className='mt-3 divide-y divider-gray-200 dark:divide-gray-700'>
            <li>
              <a
                href='#'
                className='items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <img
                  className='w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0'
                  src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
                  alt='Jese Leos image'
                />
                <div className='text-gray-600 dark:text-gray-400'>
                  <div className='text-base font-normal'>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Jese Leos
                    </span>{" "}
                    likes{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Bonnie Green's
                    </span>{" "}
                    post in{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {" "}
                      How to start with Flowbite library
                    </span>
                  </div>
                  <div className='text-sm font-normal'>
                    "I wanted to share a webinar zeroheight."
                  </div>
                  <span className='inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400'>
                    <svg
                      className='w-2.5 h-2.5 mr-1'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z' />
                    </svg>
                    Public
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <img
                  className='w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0'
                  src='/docs/images/people/profile-picture-3.jpg'
                  alt='Bonnie Green image'
                />
                <div>
                  <div className='text-base font-normal text-gray-600 dark:text-gray-400'>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Bonnie Green
                    </span>{" "}
                    react to{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Thomas Lean's
                    </span>{" "}
                    comment
                  </div>
                  <span className='inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400'>
                    <svg
                      className='w-2.5 h-2.5 mr-1'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z' />
                      <path d='m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z' />
                      <path d='M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z' />
                    </svg>
                    Private
                  </span>
                </div>
              </a>
            </li>
          </ol>
        </div>
        <div className='p-5 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700'>
          <time className='text-lg font-semibold text-gray-900 dark:text-white'>
            January 12th, 2022
          </time>
          <ol className='mt-3 divide-y divider-gray-200 dark:divide-gray-700'>
            <li>
              <a
                href='#'
                className='items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <img
                  className='w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0'
                  src='/docs/images/people/profile-picture-4.jpg'
                  alt='Laura Romeros image'
                />
                <div className='text-gray-600 dark:text-gray-400'>
                  <div className='text-base font-normal'>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Laura Romeros
                    </span>{" "}
                    likes{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Bonnie Green's
                    </span>{" "}
                    post in{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {" "}
                      How to start with Flowbite library
                    </span>
                  </div>
                  <div className='text-sm font-normal'>
                    "I wanted to share a webinar zeroheight."
                  </div>
                  <span className='inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400'>
                    <svg
                      className='w-2.5 h-2.5 mr-1'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z' />
                      <path d='m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z' />
                      <path d='M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z' />
                    </svg>
                    Private
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <img
                  className='w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0'
                  src='/docs/images/people/profile-picture-2.jpg'
                  alt='Mike Willi image'
                />
                <div>
                  <div className='text-base font-normal text-gray-600 dark:text-gray-400'>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Mike Willi
                    </span>{" "}
                    react to{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Thomas Lean's
                    </span>{" "}
                    comment
                  </div>
                  <span className='inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400'>
                    <svg
                      className='w-2.5 h-2.5 mr-1'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z' />
                    </svg>
                    Public
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <img
                  className='w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0'
                  src='/docs/images/people/profile-picture-5.jpg'
                  alt='Jese Leos image'
                />
                <div className='text-gray-600 dark:text-gray-400'>
                  <div className='text-base font-normal'>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Jese Leos
                    </span>{" "}
                    likes{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Bonnie Green's
                    </span>{" "}
                    post in{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {" "}
                      How to start with Flowbite library
                    </span>
                  </div>
                  <div className='text-sm font-normal'>
                    "I wanted to share a webinar zeroheight."
                  </div>
                  <span className='inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400'>
                    <svg
                      className='w-2.5 h-2.5 mr-1'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z' />
                    </svg>
                    Public
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a
                href='#'
                className='items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <img
                  className='w-12 h-12 mb-3 mr-3 rounded-full sm:mb-0'
                  src='/docs/images/people/profile-picture-3.jpg'
                  alt='Bonnie Green image'
                />
                <div className='text-gray-600 dark:text-gray-400'>
                  <div className='text-base font-normal'>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Bonnie Green
                    </span>{" "}
                    likes{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      Bonnie Green's
                    </span>{" "}
                    post in{" "}
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {" "}
                      Top figma designs
                    </span>
                  </div>
                  <div className='text-sm font-normal'>
                    "I wanted to share a webinar zeroheight."
                  </div>
                  <span className='inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400'>
                    <svg
                      className='w-2.5 h-2.5 mr-1'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z' />
                      <path d='m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z' />
                      <path d='M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z' />
                    </svg>
                    Private
                  </span>
                </div>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </>
  )
}
