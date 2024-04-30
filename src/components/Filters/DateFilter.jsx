import React from 'react'

const DateFilter = ({inputVariable,setInputVariable,handleFilter,columnName,menuRef}) => {
  return (
    <div className='h-[300px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef}>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'noFilter', columnName)}><h1 >No Filter</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'equalTo',columnName)}><h1 >EqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'notEqualTo',columnName)}><h1 >NotEqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'greaterThan', columnName)}><h1 >GreaterThan</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'lessThan', columnName)}><h1 >LessThan</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'greaterThanOrEqualTo', columnName)}><h1 >GreaterThanOrEqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'lessThanOrEqualTo', columnName)}><h1 >LessThanOrEqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'isNull', columnName)}><h1 >isNull</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter(inputVariable,setInputVariable,'isNotNull', columnName,inputVariable,setInputVariable)}><h1 >isNotNull</h1></button>
                                    </div>
                                </div>
  )
}

export default DateFilter
