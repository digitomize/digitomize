
import * as React from 'react';
import Filter from "./Filter";


export default function ContestPage() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="w-11/12 mx-auto">
      <div className="heading w-4/5 mx-auto text-center my-4">
        <h1 className="text-white max-md:text-4xl md:text-6xl flex flex-row mx-auto justify-center">
          <span>All at</span>
          <span className="block mt-1 md:mt-6">
            <span className="bg-digitomize-bg mx-2 px-1">one</span>
            place
          </span>
        </h1>

      </div>

      <div role="tablist" className="tabs tabs-lifted tabs-lg">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 1" checked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <div>
            <Filter />
          </div>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 2" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>
      </div>
    </div>
  )
}