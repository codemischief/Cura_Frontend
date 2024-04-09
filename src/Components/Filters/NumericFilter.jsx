import React from 'react'

const NumericFilter = ({handleFilter,columnName,menuRef}) => {
  return (
    <div className='h-[360px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef}>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('noFilter', columnName)}><h1 >No Filter</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('equalTo', columnName)}><h1 >EqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('notEqualTo',columnName)}><h1 >NotEqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('greaterThan', columnName)}><h1 >GreaterThan</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                        <button onClick={() => handleFilter('lessThan', columnName)}><h1 >LessThan</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('greaterThanOrEqualTo', columnName)}><h1 >GreaterThanOrEqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('lessThanOrEqualTo', columnName)}><h1 >LessThanOrEqualTo</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('between', columnName)}><h1 >Between</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('notBetween', columnName)}><h1 >NotBetween</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('isNull', columnName)}><h1 >isNull</h1></button>
                                    </div>
                                    <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                        <button onClick={() => handleFilter('isNotNull', columnName)}><h1 >isNotNull</h1></button>
                                    </div>
                                </div>
  )
}

export default NumericFilter
