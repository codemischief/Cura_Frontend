import React, { useState } from 'react';
import { APIService } from '../../services/API';
import Select from "react-select"
import AsyncSelect from "react-select/async"
function Temp() {
  const [selectableOptions,setSelectableOptions] = useState([{}]);
  // this will have the selectable options
  const [value,setValue] = useState("") 
  const fetchClientData = async (query) => {
      const data = {
        "user_id" : 1234,
        "search_key" : query
      }
      const response = await APIService.getClientAdmin(data)
      const res = await response.json();
      console.log(res)
      const d = res.data;
      const temp = []
      for(var i=0;i<100;i++) {
          temp.push({
            value : d[i][0],
            label : d[i][1]
          })
      }
      // setSelectableOptions(d.map(x => {
      //      return {value : x[0],
      //      label : x[1]}
      // }))
      // setCountryValues(result.data.map(x => ({
      //   sl: x[0],
      //   country_name: x[1]
      // })))
  }
  
  const handleChange = (e) => {
      // setValue(e)
      console.log('called')
      console.log(e)
      setSelectedOption(e)
      setQuery(e.label)
      // console.log(e)
      // let len = e.length

      // if(len > 3) {
      //   console.log(e)
      //   fetchClientData(e)
      // }
  }
 
  
  const [query,setQuery] = useState('Example')
  const [selectedOption,setSelectedOption] = useState({
    value : 2,
    label : query
  })
  console.log(selectedOption)
  console.log(query)
  const loadOptions = async () => {
    if(query.length < 3) return ;
    const data = {
      "user_id" : 1234,
      "pg_no" : 0,
      "pg_size" : 0,
      "search_key" : query
    }
    const res = await APIService.getClientAdminPaginated(data);
    
    const d = await res.json();
    const results = d.data.map(e => {
      return {label : e[1],
      value : e[0]}
    });
    
    if (results === 'No result found.') {
        return [];
    }

    return results;
};
  return (
    <div className="App">
      <div className="dropdown">
      <div className="label"><label>Client name</label></div>
      <AsyncSelect
            onChange={handleChange}
            value={selectedOption}
            loadOptions={loadOptions}
            cacheOptions
            defaultOptions
            // getOptionLabel={(e) => e.label}
            // getOptionValue={(e) => e.value}
            onInputChange={(value) => {
               console.log(value)
               return  setQuery(value)
            }
            } 
            
        />
      </div>
    </div>
  );
}

export default Temp;