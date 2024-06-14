import React, { useEffect, useState } from 'react'
import { Modal , CircularProgress, Backdrop ,MenuItem} from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'
import AsyncSelect from "react-select/async";
import OrderDropDown from '../../../Components/Dropdown/OrderDropdown';
import Draggable from 'react-draggable'
import useAuth from '../../../context/JwtContext';
// import CustomSelectNative from '../../../Components/common/select/CustomSelectNative';
import OrderCustomSelectNative from '../../../Components/common/select/OrderCustomSelectNative';
const EditClientInvoice = ({ handleClose, invoiceId, showSuccess , showCancel }) => {
    const {user} = useAuth()

    const initialValues = {
        client: "",
        estimateAmount: "",
        baseAmount: "",
        invoiceAmount: "",
        invoiceDescription: "",
        order: null,
        estimateDate: null,
        gst: "",
        invoiceDate: null
    };
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [orders, setOrders] = useState([])
    const [pageLoading,setPageLoading] = useState(false)
    const fetchInitialData = async () => {
        setPageLoading(true)
        const data = {
            "table_name": "get_orders_invoice_view",
            "item_id": invoiceId
        }
        const response = await APIService.getItembyId({...data, user_id : user.id});
        const res = await response.json();
        console.log(res);
        const existing = { ...formValues }
        if (res.data.clientid != null) {
            getOrdersByClientId(res.data.clientid)
        }
        existing.client = res.data.clientid
        existing.estimateAmount = res.data.estimateamount
        existing.baseAmount = res.data.baseamount
        existing.invoiceAmount = res.data.invoiceamount
        existing.invoiceDescription = res.data.quotedescription
        existing.order = res.data.orderid
        if (res.data.estimatedate != null) {
            existing.estimateDate = res.data.estimatedate.split('T')[0]
        }

        existing.gst = res.data.tax
        existing.invoiceDate = res.data.invoicedate
        setFormValues(existing)
        const temp = { ...selectedOption };
        temp.value = res.data.clientid
        temp.label = res.data.clientname
        setSelectedOption(temp)
        setTimeout(() => {
          setPageLoading(false)
        },1000)
    }
    useEffect(() => {
        fetchInitialData();
    }, [])
    const validate = () => {
        var res = true;
        if (!formValues.client) {
            setFormErrors((existing) => {
                return { ...existing, client: "Enter Client Name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, client: "" }
            })
        }
        if (!formValues.invoiceDescription) {
            console.log('issue is in panno')
            setFormErrors((existing) => {
                return { ...existing, invoiceDescription: "Enter Invoice Description" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, invoiceDescription: "" }
            })
        }
        if (!formValues.order || formValues.order == "") {
            setFormErrors((existing) => {
                return { ...existing, order: "Select Order" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, order: "" }
            })
        }
        return res;
    }
    const handleEdit = async () => {
        if (!validate()) return;
        const data = {
            "id": invoiceId,
            "clientid": formValues.client,
            "orderid": formValues.order,
            "estimatedate": formValues.estimateDate,
            "estimateamount": formValues.estimateAmount,
            "invoicedate": formValues.invoiceDate,
            "invoiceamount": formValues.invoiceAmount,
            "quotedescription": formValues.invoiceDescription,
            "createdon": "2024-10-09",
            "baseamount": formValues.baseAmount,
            "tax": formValues.gst,
            "entity": 1
        }
        const response = await APIService.editOrdersInvoice({...data, user_id : user.id});
        const res = await response.json();
        console.log(res)
        if (res.result == 'success') {
            showSuccess()
        }
    }











    // we have the client name here
    const [selectedOption, setSelectedOption] = useState({
        label: "Select Client ",
        value: null
    });
    const [query, setQuery] = useState('')

    const handleClientNameChange = (e) => {
        console.log('hey')
        console.log(e)
        //  setFormValues({...formValues,client_property : {
        //   ...formValues.client_property,
        //   clientid : e.value
        //  }})
        const existing = { ...formValues }
        existing.client = e.value
        existing.order = null
        setOrders([])
        setOrderText((prev) => "Select Order")
        getOrdersByClientId(e.value)
        setFormValues(existing)
        //    const existing = {...formValues}
        //    const temp = {...existing.client_property}
        //    temp.clientid = e.value
        //    existing.client_property = temp;
        //    setFormValues(existing)
        console.log(formValues)
        setSelectedOption(e)
    }
    function convertToIdNameObject(items) {
        const idNameObject = {};
        items.forEach((item) => {
          idNameObject[item.id] = item.ordername;
        });
        return idNameObject;
    }
    const getOrdersByClientId = async (id) => {
        
        const data = {
            "client_id": id
        }
        const response = await APIService.getOrdersByClientId({...data, user_id : user.id})
        const res = await response.json()
        
        console.log(res.data)
        setOrders(convertToIdNameObject(res.data))

        // if(res.data.length >= 1) {
        //    const existing = {...formValues}
        //    existing.order = res.data[0].id
        //    console.log(res.data[0].id)
        //    setFormValues(existing)

        // } 
    }

    const loadOptions = async (e) => {
        console.log(e)
        if (e.length < 3) return;
        const data = {
            "pg_no": 0,
            "pg_size": 0,
            "search_key": e
        }
        const response = await APIService.getClientAdminPaginated({...data, user_id : user.id})
        const res = await response.json()
        const results = res.data.map(e => {
            return {
                label: e[1],
                value: e[0]
            }
        })
        if (results === 'No Result Found') {
            return []
        }
        return results
    }

    const close = () =>{
        handleClose();
        showCancel();
    }

    const [orderText, setOrderText] = useState("Select Order")

    return (
        <Modal open={true}
            fullWidth={true}
            maxWidth={'md'}
            className='flex justify-center items-center'
        >
            <div className='flex justify-center'>
                 
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={pageLoading}
                            onClick={() => {}}
                            >

                        <CircularProgress color="inherit"/>

                        </Backdrop>
                <Draggable handle='div.move'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className='move cursor-move'>
                            <div className="h-10 bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg relative">
                                <div className="mr-[410px] ml-[410px]">
                                    <div className="text-base">Edit Client Invoice </div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-7 h-7 bg-white absolute right-2">
                                    <button onClick={() => {close()}}><img onClick={handleClose} className="w-5 h-5" src={Cross} alt="cross" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-center mt-1 font-semibold">Invoice ID: {invoiceId}</div>
                        <div className="h-[350px] w-full mt-1 ">
                        {/* {pageLoading && <div className='flex space-x-2 items-center justify-center mt-2 mb-2'>
                            <CircularProgress />
                            <h1>Fetching Data</h1>
                        </div> } */}
                        {!pageLoading &&
                            <div className="flex gap-12 justify-center">
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-[13px] pb-0.5">
                                            Client Name<label className="text-red-500">*</label>
                                        </div>
                                        <AsyncSelect
                                            onChange={handleClientNameChange}
                                            value={selectedOption}
                                            loadOptions={loadOptions}
                                            cacheOptions
                                            defaultOptions
                                            onInputChange={(value) => setQuery(value)}

                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    minHeight: 23,
                                                    lineHeight: '0.8',
                                                    height: 4,
                                                    width: 230,
                                                    fontSize: 10,
                                                    // padding: '1px'
                                                }),
                                                // indicatorSeparator: (provided, state) => ({
                                                //   ...provided,
                                                //   lineHeight : '0.5',
                                                //   height : 2,
                                                //   fontSize : 12 // hide the indicator separator
                                                // }),
                                                dropdownIndicator: (provided, state) => ({
                                                    ...provided,
                                                    padding: '1px', // adjust padding for the dropdown indicator
                                                }),
                                                // options: (provided, state) => ({
                                                //     ...provided,
                                                //     fontSize: 10// adjust padding for the dropdown indicator
                                                // }),
                                                option: (provided, state) => ({
                                                    ...provided,
                                                    padding: '2px 10px', // Adjust padding of individual options (top/bottom, left/right)
                                                    margin: 0, // Ensure no extra margin
                                                    fontSize: 10 // Adjust font size of individual options
                                                }),
                                                menu: (provided, state) => ({
                                                    ...provided,
                                                    width: 230, // Adjust the width of the dropdown menu
                                                    zIndex: 9999 // Ensure the menu appears above other elements
                                                }),
                                                menuList: (provided, state) => ({
                                                    ...provided,
                                                    padding: 0, // Adjust padding of the menu list
                                                    fontSize: 10,
                                                    maxHeight: 150 // Adjust font size of the menu list
                                                }),
                                                
                                            }}
                                        />
                                        <div className="text-[10px] text-[#CD0000] absolute">{formErrors.client}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Estimate Amount</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="estimateAmount" value={formValues.estimateAmount} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Base Amount</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="baseAmount" value={formValues.baseAmount} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Invoice Amount</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="invoiceAmount" value={formValues.invoiceAmount} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Quote/Invoice Description <label className="text-red-500">*</label></div>
                                        <textarea className="w-56 h-16 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="invoiceDescription" value={formValues.invoiceDescription} onChange={handleChange} />
                                        <div className="text-[10px] text-[#CD0000] absolute">{formErrors.invoiceDescription}</div>
                                    </div>
                                </div>
                                <div className=" space-y-3 py-5">
                                    <div className="">
                                        <div className="text-[13px] mb-1">
                                            Order <label className="text-red-500">*</label>
                                        </div>
                                        {/* <select
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                            name="order"
                                            value={formValues.order}
                                            onChange={handleChange}
                                        >
                                            <option value="" >Select A Order</option>
                                            {orders.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.ordername}
                                                </option>
                                            ))}
                                        </select> */}
                                         <OrderCustomSelectNative
                                           data={Object.keys(orders)}
                                           value={orders?.[formValues.order] ? orders?.[formValues.order]:null}
                                           placeholder="Select Orders"
                                           isSticky={true}
                                           headerText={{
                                            first : 'ID',
                                            second : 'Order Description',
                                          }}
                                          renderData={(item) => {
                                            return (
                                                <MenuItem value={item} key={item} sx={{ width : '300px', gap : '5px', fontSize : '12px'}}>
                                                <p className="w-[80%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                                   {orders[item]}
                                                </p>
                                                <span className='w-[20%]'>
                                                    {item}
                                                </span>
                                                
                                               
                                              </MenuItem>
                                            );
                                          }}
                                          onChange={(e) => {
                                            setFormValues({ ...formValues, order: e.target.value })
                                           }}
                                           
                                        
                                        />
                                        {/* <OrderDropDown options={orders} orderText={orderText} setOrderText={setOrderText} leftLabel="ID" rightLabel="OrderName" leftAttr="id" rightAttr="ordername" toSelect="ordername" handleChange={handleChange} formValueName="order" value={formValues.order} /> */}
                                        <div className="text-[10px] text-[#CD0000] absolute">{formErrors.order}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Estimate Date</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="estimateDate" value={formValues.estimateDate} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">GST / ST</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="gst" value={formValues.gst} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Invoice Date</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="date" name="invoiceDate" value={formValues.invoiceDate} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="my-3 flex justify-center items-center gap-3">
                            <button className='w-28 h-10 bg-[#004DD7] text-white rounded-md text-lg' onClick={handleEdit} >Save</button>
                            <button className='w-28 h-10 border-[1px] border-[#282828] rounded-md text-lg' onClick={() => {close()}}>Cancel</button>
                        </div>

                    </div>
                
            </Draggable>
            </div>
        </Modal>
    )
}

export default EditClientInvoice
