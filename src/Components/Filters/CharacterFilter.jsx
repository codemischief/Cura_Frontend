import React from 'react'

const CharacterFilter = ({inputVariable,setInputVariable, handleFilter, filterColumn, menuRef }) => {
    return (
        <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm z-40' ref={menuRef}>
            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                <button onClick={() => handleFilter(inputVariable,setInputVariable,'noFilter', filterColumn)}><h1> No Filter</h1></button>
            </div>
            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                <button onClick={() => handleFilter(inputVariable,setInputVariable,'contains', filterColumn)}><h1 >Contains</h1></button>
            </div>
            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                <button onClick={() => handleFilter(inputVariable,setInputVariable,'doesNotContain', filterColumn)}><h1 >DoesNotContain</h1></button>
            </div>
            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                <button onClick={() => handleFilter(inputVariable,setInputVariable,'startsWith', filterColumn)}><h1 >StartsWith</h1></button>
            </div>
            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                <button onClick={() => handleFilter(inputVariable,setInputVariable,'endsWith', filterColumn)}><h1 >EndsWith</h1></button>
            </div>
            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                <button onClick={() => handleFilter(inputVariable,setInputVariable,'equalTo', filterColumn)}><h1 >EqualTo</h1></button>
            </div>
            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                <button onClick={() => handleFilter(inputVariable,setInputVariable,'isNull', filterColumn)}><h1 >isNull</h1></button>
            </div>
            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                <button onClick={() => handleFilter(inputVariable,setInputVariable,'isNotNull', filterColumn)}><h1 >isNotNull</h1></button>
            </div>
        </div>
    )
}

export default CharacterFilter
