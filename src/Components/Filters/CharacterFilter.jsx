import React from 'react'

const CharacterFilter = ({ inputVariable, setInputVariable, handleFilter, filterColumn, menuRef, filterType }) => {
    return (
        <div className='h-[290px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute  flex-col rounded-md space-y-0 text-sm z-40' ref={menuRef}>
            <button onClick={() => handleFilter(inputVariable, setInputVariable, 'noFilter', filterColumn)} className='w-[150px] p-1'>
                <div className={`hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer text-start`}>
                    <h1> No Filter</h1>
                </div>
            </button>
            <button onClick={() => handleFilter(inputVariable, setInputVariable, 'contains', filterColumn)} className='w-[150px] p-1'>
                {console.log(filterType)}
                <div className={`${filterType == "contains" ? "bg-[#dae7ff]" : "hover:bg-[#dae7ff]"} p-1 rounded-sm cursor-pointer text-start`}>
                    <h1 >Contains</h1>
                </div>
            </button>
            <button onClick={() => handleFilter(inputVariable, setInputVariable, 'doesNotContain', filterColumn)} className='w-[150px] p-1'>
                <div className={`${filterType == "doesNotContain" ? "bg-[#dae7ff]" : "hover:bg-[#dae7ff]"} p-1 rounded-sm cursor-pointer text-start`}>
                    <h1 >DoesNotContain</h1>
                </div>
            </button>
            <button onClick={() => handleFilter(inputVariable, setInputVariable, 'startsWith', filterColumn)} className='w-[150px] p-1'>
                <div className={`${filterType == "startsWith" ? "bg-[#dae7ff]" : "hover:bg-[#dae7ff]"} p-1 rounded-sm cursor-pointer text-start`}>
                    <h1 >StartsWith</h1>
                </div>
            </button>
            <button onClick={() => handleFilter(inputVariable, setInputVariable, 'endsWith', filterColumn)} className='w-[150px] p-1'>
                <div className={`${filterType == "endsWith" ? "bg-[#dae7ff]" : "hover:bg-[#dae7ff]"} p-1 rounded-sm cursor-pointer text-start`}>
                    <h1 >EndsWith</h1>
                </div>
            </button>
            <button onClick={() => handleFilter(inputVariable, setInputVariable, 'equalTo', filterColumn)} className='w-[150px] p-1'>
                <div className={`${filterType == "equalTo" ? "bg-[#dae7ff]" : "hover:bg-[#dae7ff]"} p-1 rounded-sm cursor-pointer text-start`}>
                    <h1 >EqualTo</h1>
                </div>
            </button>
            <button onClick={() => handleFilter(inputVariable, setInputVariable, 'isNull', filterColumn)} className='w-[150px] p-1'>
                <div className={`${filterType == "isNull" ? "bg-[#dae7ff]" : "hover:bg-[#dae7ff]"} p-1 rounded-sm cursor-pointer text-start`}>
                    <h1 >isNull</h1>
                </div>
            </button>
            <button onClick={() => handleFilter(inputVariable, setInputVariable, 'isNotNull', filterColumn)} className='w-[150px] p-1'>
                <div className={`${filterType == "isNotNull" ? "bg-[#dae7ff]" : "hover:bg-[#dae7ff]"} p-1 rounded-sm cursor-pointer text-start`}>
                    <h1 >isNotNull</h1>
                </div>
            </button>
        </div>
    )
}

export default CharacterFilter
